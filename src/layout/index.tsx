import {FC} from 'react';
import {Layout} from 'antd';
import Header from '@/layout/header';
import Menu from '@/layout/menu';
import Content from '@/layout/content';
import Trigger from '@/components/trigger';
import {useSelector} from 'react-redux';
import {ReducersType} from '@/store';

const {Sider} = Layout;

const LayoutMain: FC = () => {
    const collapsed = useSelector<ReducersType, boolean>((state) => state.setting.collapsed);

    return (
        <Layout className="h-screen">
            <Sider collapsible collapsed={collapsed} trigger={<Trigger />} theme="light">
                <Menu />
            </Sider>
            <Layout>
                <Header />
                <Content />
            </Layout>
        </Layout>
    );
};

export default LayoutMain;
