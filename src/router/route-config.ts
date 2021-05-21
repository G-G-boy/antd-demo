import {ComponentType, LazyExoticComponent, lazy} from 'react';
import {
    UserOutlined,
    TableOutlined,
    FormOutlined,
    DashboardOutlined,
    CustomerServiceOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

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
        icon: DashboardOutlined,
        path: '/dashboard',
        component: lazy(() => import('@/pages/dashboard')),
    },
    {
        title: '状态管理',
        icon: CustomerServiceOutlined,
        path: '/state-management',
        component: lazy(() => import('@/pages/state-management')),
    },
    {
        title: '动画',
        icon: LoadingOutlined,
        path: '/animation',
        component: lazy(() => import('@/pages/animation')),
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
                title: 'swr',
                path: '/list/swr',
                component: lazy(() => import('@/pages/list/basic-table')),
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
