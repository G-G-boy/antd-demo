import {FC, ElementType} from 'react';
import {Provider, useSelector} from 'react-redux';
import store, {ReducersType} from '@/store';
import Router from '@/router';
import AppIntlProvider from '@/locale';
import ErrorBoundary from '@/components/error-boundary';
import {SWRConfig, SWRConfiguration} from 'swr';
import {withProfiler} from '@sentry/react';
import {ConfigProvider} from 'antd';
import {DirectionType} from 'antd/lib/config-provider/context';
import {Helmet} from 'react-helmet';

const AntdConfigProvider: FC = ({children}) => {
    const direction = useSelector<ReducersType, DirectionType>(
        (state) => state.necessity.direction,
    );
    return (
        <>
            <Helmet>
                <html dir={direction} />
                <body dir={direction} />
            </Helmet>
            <ConfigProvider direction={direction}>{children}</ConfigProvider>
        </>
    );
};

const swrConfig: SWRConfiguration<any, any, (...args: any) => any | Promise<any>> = {
    revalidateOnFocus: false,
};

const AppSwrConfig: FC = ({children}) => {
    return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};

const AppProvider: FC = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
};

const composeProviders: (...args: ElementType[]) => ElementType =
    (...providers) =>
    ({children}) =>
        providers.reduce((prev, Provider) => {
            return <Provider>{prev}</Provider>;
        }, children);

const Providers = composeProviders(
    ErrorBoundary,
    AppIntlProvider,
    AntdConfigProvider,
    AppProvider,
    AppSwrConfig,
);

const App: FC = () => (
    <Providers>
        <Router />
    </Providers>
);

export default withProfiler(App, {name: 'AntdTailwindSentryDemo'});
