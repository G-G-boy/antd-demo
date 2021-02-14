import {ComponentType, LazyExoticComponent, lazy} from 'react';
import {HomeOutlined, UserOutlined} from '@ant-design/icons';

export type RouteConfig = Array<{
    icon?: ComponentType;
    title: string;
    path: string;
    component?: ComponentType | LazyExoticComponent<any>;
    children?: RouteConfig;
}>;

const routeConfig: RouteConfig = [
    {
        title: '仪表盘',
        icon: HomeOutlined,
        path: '/dashboard',
        component: lazy(() => import('@/pages/dashboard')),
    },
    {
        title: '个人页',
        icon: UserOutlined,
        path: '/account',
        children: [
            {
                title: '个人中心',
                path: '/account/center',
                component: lazy(() => import('@/pages/account/center')),
            },
            {
                title: '个人设置',
                path: '/account/setting',
                component: lazy(() => import('@/pages/account/setting')),
            },
        ],
    },
];

export default routeConfig;
