import {FC} from 'react';
import {Menu, MenuTheme} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import routeConfig, {RouteConfig} from '@/router/route-config';
import Logo from '@/components/logo';
import {ReducersType} from '@/store';
import {useSelector} from 'react-redux';

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

const getDefaultOpenKeys = (pathname: string): string[] => {
    let pathArr: string[] = [];
    pathname
        .split('/')
        .filter((value) => value)
        .map((value) => '/' + value)
        .reduce((previousValue, currentValue) => {
            const newValue = previousValue + currentValue;
            pathArr.push(newValue);
            return newValue;
        }, '');
    return pathArr;
};

const LayoutMenu: FC = () => {
    const {pathname} = useLocation();
    const siderTheme = useSelector<ReducersType, MenuTheme>((state) => state.setting.siderTheme);

    return (
        <>
            <Logo />
            <Menu
                mode="inline"
                theme={siderTheme}
                defaultOpenKeys={getDefaultOpenKeys(pathname)}
                defaultSelectedKeys={[pathname === '/' ? '/dashboard' : pathname]}
                selectedKeys={getDefaultOpenKeys(pathname)}
            >
                {menuListMap(routeConfig)}
            </Menu>
        </>
    );
};

export default LayoutMenu;
