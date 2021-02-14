import {FC} from 'react';
import {Grid, Layout, Drawer} from 'antd';
import Header from '@/layout/header';
import Menu from '@/layout/menu';
import Content from '@/layout/content';
import SettingContent from '@/layout/setting-content';
import Trigger from '@/components/trigger';
import {useSelector, useDispatch} from 'react-redux';
import {setMenuDrawerVisible} from '@/store/setting/setting.action';
import {ReducersType} from '@/store';

const {Sider} = Layout;
const {useBreakpoint} = Grid;

const LayoutMain: FC = () => {
    const collapsed = useSelector<ReducersType, boolean>((state) => state.setting.collapsed);
    const menuDrawerVisible = useSelector<ReducersType, boolean>(
        (state) => state.setting.menuDrawerVisible,
    );
    const {xs} = useBreakpoint();
    const dispatch = useDispatch();

    return (
        <Layout className="h-screen">
            {xs ? (
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={() => dispatch(setMenuDrawerVisible(false))}
                    visible={menuDrawerVisible}
                    bodyStyle={{padding: 0, backgroundColor: '#001529'}}
                    width={200}
                >
                    <Menu />
                </Drawer>
            ) : (
                <Sider collapsible collapsed={collapsed} trigger={<Trigger />}>
                    <Menu />
                </Sider>
            )}
            <Layout className="overflow-x-hidden">
                <Header />
                <Content />
            </Layout>
            <SettingContent />
        </Layout>
    );
};

export default LayoutMain;
