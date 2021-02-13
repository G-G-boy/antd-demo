import {FC} from 'react';
import {Provider} from 'react-redux';
import store from '@/store';
import Router from '@/router';

const App: FC = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};

export default App;
