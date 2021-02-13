import {FC} from 'react';
import {Provider} from 'react-redux';
import store from '@/store';
import Router from '@/router';
import AppIntlProvider from '@/locale';

const App: FC = () => {
    return (
        <Provider store={store}>
            <AppIntlProvider>
                <Router />
            </AppIntlProvider>
        </Provider>
    );
};

export default App;
