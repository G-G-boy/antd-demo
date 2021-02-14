import {FC, lazy, Suspense} from 'react';
import {Layout} from 'antd';
import {Switch, Redirect, Route} from 'react-router-dom';
import Loading from '@/components/loading';
import routeConfig, {RouteConfig} from '@/router/route-config';

const {Content} = Layout;
const NoFoundPage = lazy(() => import('@/pages/error/404'));

const routeMap = (routeConfig: RouteConfig) => {
    return routeConfig.map((value) => {
        if (value.children) {
            return routeMap(value.children);
        } else {
            return <Route key={value.path} path={value.path} component={value.component} />;
        }
    });
};

const LayoutContent: FC = () => {
    return (
        <Content style={{height: 'calc(100% - 64px)'}}>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    {routeMap(routeConfig)}
                    <Route path="/error/404" component={NoFoundPage} />
                    <Redirect to="/error/404" />
                </Switch>
            </Suspense>
        </Content>
    );
};

export default LayoutContent;
