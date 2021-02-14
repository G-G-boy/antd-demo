import {FC} from 'react';
import {Provider} from 'react-redux';
import store from '@/store';
import Router from '@/router';
import AppIntlProvider from '@/locale';
import ErrorBoundary from '@/components/error-boundary';

const App: FC = () => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <AppIntlProvider>
                    <Router />
                </AppIntlProvider>
            </Provider>
        </ErrorBoundary>
    );
};

export default App;
