import {FC} from 'react';
import {Grid, Layout, Drawer, MenuTheme} from 'antd';
import Header from '@/layout/header';
import Menu from '@/layout/menu';
import Content from '@/layout/content';
import SettingContent from '@/layout/setting-content';
import Trigger from '@/components/trigger';
import {useSelector, useDispatch} from 'react-redux';
import {setMenuDrawerVisible} from '@/store/setting/setting.action';
import {ReducersType} from '@/store';
import classNames from 'classnames';

const {Sider} = Layout;
const {useBreakpoint} = Grid;

const LayoutMain: FC = ({children}) => {
    const collapsed = useSelector<ReducersType, boolean>((state) => state.setting.collapsed);
    const menuDrawerVisible = useSelector<ReducersType, boolean>(
        (state) => state.setting.menuDrawerVisible,
    );
    const {xs} = useBreakpoint();
    const dispatch = useDispatch();
    const siderTheme = useSelector<ReducersType, MenuTheme>((state) => state.setting.siderTheme);

    const siderClass = classNames({
        'bg-white': siderTheme === 'light',
    });

    return (
        <Layout className="h-screen">
            {xs ? (
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={() => dispatch(setMenuDrawerVisible(false))}
                    visible={menuDrawerVisible}
                    bodyStyle={{
                        padding: 0,
                        backgroundColor: siderTheme === 'dark' ? '#001529' : '#fff',
                    }}
                    width={200}
                >
                    <Menu />
                </Drawer>
            ) : (
                <Sider
                    className={`shadow-sm ${siderClass}`}
                    collapsible
                    collapsed={collapsed}
                    theme={siderTheme}
                    trigger={<Trigger />}
                >
                    <Menu />
                </Sider>
            )}
            <Layout className="overflow-x-hidden">{children}</Layout>
            <SettingContent />
        </Layout>
    );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <LayoutMain>
            <Header />
            <Content />
        </LayoutMain>
    );
};
