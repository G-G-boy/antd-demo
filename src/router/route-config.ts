import {ComponentType, LazyExoticComponent, lazy} from 'react';
import {HomeOutlined} from '@ant-design/icons';

export type RouteConfig = Array<{
    icon?: ComponentType;
    title: string;
    path: string;
    component?: ComponentType | LazyExoticComponent<any>;
    children?: RouteConfig;
}>;

const routeConfig: RouteConfig = [
    {
        title: '首页',
        icon: HomeOutlined,
        path: '/dashboard',
        component: lazy(() => import('@/pages/dashboard')),
    },
];

export default routeConfig;
