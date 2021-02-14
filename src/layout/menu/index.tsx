import {FC} from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import routeConfig, {RouteConfig} from '@/router/route-config';

const {SubMenu} = Menu;

const menuListMap = (routeConfig: RouteConfig) => {
    return routeConfig.map((value) => {
        if (value.children) {
            return (
                <SubMenu key={value.path} icon={value.icon && <value.icon />} title={value.title}>
                    {menuListMap(value.children)}
                </SubMenu>
            );
        } else {
            return (
                <Menu.Item key={value.path} icon={value.icon && <value.icon />}>
                    <Link to={value.path}>{value.title}</Link>
                </Menu.Item>
            );
        }
    });
};

const LayoutMenu: FC = () => {
    return (
        <Menu mode="inline" selectedKeys={[]} defaultOpenKeys={[]}>
            {menuListMap(routeConfig)}
        </Menu>
    );
};

export default LayoutMenu;
