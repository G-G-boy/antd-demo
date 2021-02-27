import {ComponentType, LazyExoticComponent, lazy} from 'react';
import {HomeOutlined, UserOutlined, TableOutlined, FormOutlined} from '@ant-design/icons';

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
    {
        title: '列表页',
        icon: TableOutlined,
        path: '/list',
        children: [
            {
                title: '基础列表',
                path: '/list/basic',
                component: lazy(() => import('@/pages/list/basic-list')),
            },
            {
                title: '高级表格',
                path: '/list/pro-table',
                component: lazy(() => import('@/pages/list/advanced-table')),
            },
            {
                title: '无限列表',
                path: '/list/infinite',
                component: lazy(() => import('@/pages/list/infinite-list')),
            },
        ],
    },
    {
        title: '表单页',
        icon: FormOutlined,
        path: '/form',
        children: [
            {
                title: '基础表单',
                path: '/form/basic',
                component: lazy(() => import('@/pages/form/basic-form')),
            },
        ],
    },
];

export default routeConfig;
