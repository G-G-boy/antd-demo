import {FC, CSSProperties} from 'react';
import {Layout, Grid} from 'antd';
import SelectLang from '@/components/select-lang';
import Account from '@/components/account';
import Trigger from '@/components/trigger';
import Setting from '@/components/setting';
import NoticeView from '@/components/notice';
import ThemeSelect from '@/components/theme';
import {useSelector} from 'react-redux';
import {ReducersType} from '@/store';
import classNames from 'classnames';
import DirectionSwitch from '@/components/direction-switch';

const {Header} = Layout;
const {useBreakpoint} = Grid;

const LayoutHeader: FC = () => {
    const {xs} = useBreakpoint();
    const fixHeader = useSelector<ReducersType, boolean>((state) => state.setting.fixHeader);
    const collapsed = useSelector<ReducersType, boolean>((state) => state.setting.collapsed);

    const computedStyle = (): CSSProperties => {
        let styles: CSSProperties;
        if (fixHeader) {
            if (collapsed) {
                styles = {
                    width: 'calc(100% - 80px)',
                };
                if (xs) {
                    styles = {
                        width: '100%',
                    };
                }
            } else {
                styles = {
                    width: 'calc(100% - 200px)',
                };
            }
        } else {
            styles = {
                width: '100%',
            };
        }
        return styles;
    };

    const headerClass = classNames({
        'fixed top-0 right-0 z-50': fixHeader,
    });

    return (
        <>
            {fixHeader ? <Header /> : null}
            <Header style={computedStyle()} className={`bg-white px-4 ${headerClass}`}>
                <div className="float-start h-full flex items-center">{xs && <Trigger />}</div>

                <div className="float-end h-full flex items-center">
                    <ThemeSelect />
                    <Setting />
                    <NoticeView />
                    <Account />
                    <DirectionSwitch />
                    <SelectLang />
                </div>
            </Header>
        </>
    );
};

export default LayoutHeader;
