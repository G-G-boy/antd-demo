import {FC} from 'react';
import PageContainer from '@/components/page-container';
import Vlist from './VList';
import './index.css';

const data: any[] = [];
const dataLength = 10000;
for (let id = 0; id < dataLength; ++id) {
    data.push({
        id,
        value: Math.random().toString(),
    });
}

const userVisibleHeight = 800;
const estimateRowHeight = 94;
const bufferSize = 5;

const VirtualList: FC = () => {
    return (
        <PageContainer>
            <div>
                <Vlist
                    height={userVisibleHeight}
                    total={dataLength}
                    estimateRowHeight={estimateRowHeight}
                    bufferSize={bufferSize}
                    rowRenderer={(index: number, styleData: any) => {
                        const item = index;
                        return (
                            <div
                                key={item}
                                className={'item'}
                                style={styleData}
                                onClick={() => {
                                    console.log('item-', index);
                                }}
                                id={`item-${index}`}
                            >
                                <span className={'item-span'}>Item - {data[index].id} Data:</span>
                                <span className={'item-span-span'}>{data[index].value}</span>
                            </div>
                        );
                    }}
                />
            </div>
        </PageContainer>
    );
};

export default VirtualList;
