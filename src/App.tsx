import {FC, ElementType} from 'react';
import {Provider} from 'react-redux';
import store from '@/store';
import Router from '@/router';
import AppIntlProvider from '@/locale';
import ErrorBoundary from '@/components/error-boundary';
import {SWRConfig, ConfigInterface} from 'swr';
import {withProfiler} from '@sentry/react';

const swrConfig: ConfigInterface<any, any, (...args: any) => any | Promise<any>> = {
    revalidateOnFocus: false,
};

const AppSwrConfig: FC = ({children}) => {
    return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};

const AppProvider: FC = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
};

const composeProviders: (...args: ElementType[]) => ElementType = (...providers) => ({children}) =>
    providers.reduce((prev, Provider) => {
        return <Provider>{prev}</Provider>;
    }, children);

const Providers = composeProviders(ErrorBoundary, AppIntlProvider, AppProvider, AppSwrConfig);

const App: FC = () => (
    <Providers>
        <Router />
    </Providers>
);

export default withProfiler(App, {name: 'AntdTailwindSentryDemo'});
