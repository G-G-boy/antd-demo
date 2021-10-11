import {binarySearch, CompareResult} from './bst';
import {Empty} from 'antd';
import {ReactNode, Component, createRef} from 'react';

export interface VirtualListProps {
    height: number;
    total: number;
    estimateRowHeight: number;
    rowRenderer: (index: number, styleData: any) => any;
    bufferSize?: number;
    noDataContent?: ReactNode;
}

interface CachedPosition {
    index: number;
    top: number;
    bottom: number;
    height: number;
    dValue: number;
}

export default class VirtualList extends Component<VirtualListProps> {
    state = {
        scrollTop: 0,
    };

    height = this.props.height;
    total = this.props.total;
    estimatedRowHeight = this.props.estimateRowHeight;
    bufferSize = this.props.bufferSize || 5;

    scrollingContainer = createRef<HTMLDivElement>();

    // params that use for calculate visible content
    limit = Math.ceil(this.height / this.estimatedRowHeight);
    originStartIdx = 0;
    startIndex = 0;
    endIndex = Math.min(this.originStartIdx + this.limit + this.bufferSize, this.total - 1);

    // handle dynamic inner content height
    cachedPositions: CachedPosition[] = [];
    phantomContentRef = createRef<HTMLDivElement>();
    actualContentRef = createRef<HTMLDivElement>();
    phantomHeight = this.estimatedRowHeight * this.total;

    constructor(props) {
        super(props);
        this.initCachedPositions();
    }

    componentDidMount() {
        if (this.actualContentRef.current && this.total > 0) {
            this.updateCachedPositions();
        }
    }

    componentDidUpdate() {
        if (this.total !== this.props.total) {
            this.total = this.props.total;
            this.resetAllVirtualParam();
            return;
        }

        if (this.actualContentRef.current && this.total > 0) {
            this.updateCachedPositions();
        }
    }

    initCachedPositions = () => {
        const {estimatedRowHeight} = this;
        this.cachedPositions = [];
        for (let i = 0; i < this.total; ++i) {
            this.cachedPositions[i] = {
                index: i,
                height: estimatedRowHeight,
                top: i * estimatedRowHeight,
                bottom: (i + 1) * estimatedRowHeight,
                dValue: 0,
            };
        }
    };

    /**
     * Update cached positions when componentDidMount Triggered...
     */
    updateCachedPositions = () => {
        // update cached item height
        const nodes: NodeListOf<any> = this.actualContentRef.current!.childNodes;
        const start = nodes[0];

        // calculate height diff for each visible node...
        nodes.forEach((node: HTMLDivElement) => {
            if (!node) {
                // scroll too fast?...
                return;
            }
            const rect = node.getBoundingClientRect();
            const {height} = rect;
            const index = Number(node.id.split('-')[1]);
            const oldHeight = this.cachedPositions[index].height;
            const dValue = oldHeight - height;

            if (dValue) {
                this.cachedPositions[index].bottom -= dValue;
                this.cachedPositions[index].height = height;
                this.cachedPositions[index].dValue = dValue;
            }
        });

        // perform one time height update...
        let startIdx = 0;
        if (start) {
            startIdx = Number(start.id.split('-')[1]);
        }
        const cachedPositionsLen = this.cachedPositions.length;
        let cumulativeDiffHeight = this.cachedPositions[startIdx].dValue;
        this.cachedPositions[startIdx].dValue = 0;

        for (let i = startIdx + 1; i < cachedPositionsLen; ++i) {
            const item = this.cachedPositions[i];
            // update height
            this.cachedPositions[i].top = this.cachedPositions[i - 1].bottom;
            this.cachedPositions[i].bottom = this.cachedPositions[i].bottom - cumulativeDiffHeight;

            if (item.dValue !== 0) {
                cumulativeDiffHeight += item.dValue;
                item.dValue = 0;
            }
        }

        // update our phantom div height
        const height = this.cachedPositions[cachedPositionsLen - 1].bottom;
        this.phantomHeight = height;
        this.phantomContentRef.current!.style.height = `${height}px`;
    };

    getStartIndex = (scrollTop = 0) => {
        let idx = binarySearch<CachedPosition, number>(
            this.cachedPositions,
            scrollTop,
            (currentValue: CachedPosition, targetValue: number) => {
                const currentCompareValue = currentValue.bottom;
                if (currentCompareValue === targetValue) {
                    return CompareResult.eq;
                }

                if (currentCompareValue < targetValue) {
                    return CompareResult.lt;
                }

                return CompareResult.gt;
            },
        );

        const targetItem = this.cachedPositions[idx];

        // Incase of binarySearch give us a not visible data(an idx of current visible - 1)...
        if (targetItem.bottom < scrollTop) {
            idx += 1;
        }

        return idx;
    };

    /**
     * Rest all VList helper param when total changes
     */
    resetAllVirtualParam = () => {
        this.originStartIdx = 0;
        this.startIndex = 0;
        this.endIndex = Math.min(
            this.originStartIdx + this.limit + this.bufferSize,
            this.total - 1,
        );
        this.scrollingContainer.current!.scrollTop = 0;
        this.initCachedPositions();

        // rest phantom div height
        this.phantomHeight = this.estimatedRowHeight * this.total;
        this.setState({scrollTop: 0});
    };

    onScroll = (evt: any) => {
        if (evt.target === this.scrollingContainer.current) {
            const {scrollTop} = evt.target;
            const {originStartIdx, bufferSize, total} = this;

            const currentStartIndex = this.getStartIndex(scrollTop);

            if (currentStartIndex !== originStartIdx) {
                // we need to update visualized data
                this.originStartIdx = currentStartIndex;
                this.startIndex = Math.max(this.originStartIdx - bufferSize, 0);
                this.endIndex = Math.min(this.originStartIdx + this.limit + bufferSize, total - 1);
                this.setState({scrollTop});
            }
        }
    };

    /**
     * Prepare visible data
     */
    renderDisplayContent = () => {
        const content = [];
        for (let i = this.startIndex; i <= this.endIndex; ++i) {
            content.push(
                // @ts-ignore
                this.props.rowRenderer(i, {
                    left: 0,
                    right: 0,
                    width: '100%',
                }),
            );
        }
        return content;
    };

    getTransform = () =>
        `translate3d(0,${
            this.startIndex >= 1 ? this.cachedPositions[this.startIndex - 1].bottom : 0
        }px,0)`;

    render() {
        const {height, phantomHeight, total} = this;
        const {noDataContent} = this.props;
        return (
            <div
                ref={this.scrollingContainer}
                style={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height,
                    position: 'relative',
                }}
                onScroll={this.onScroll}
            >
                <div
                    ref={this.phantomContentRef}
                    style={{height: phantomHeight, position: 'relative'}}
                />
                <div
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        transform: this.getTransform(),
                    }}
                    ref={this.actualContentRef}
                >
                    {this.renderDisplayContent()}
                </div>
                {total === 0 && (noDataContent || <Empty />)}
            </div>
        );
    }
}
