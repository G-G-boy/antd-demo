import {Router as BrowserRouter, Switch, Redirect} from 'react-router-dom';
import {FC} from 'react';
import {useSelector} from 'react-redux';
import {ReducersType} from '@/store';
import Login from '@/pages/login';
import LayoutMain from '@/layout';
import history from '@/router/history';
import SentryRoute from '@/router/SentryRoute';

const Router: FC = () => {
    const token = useSelector<ReducersType>((state) => state.necessity.token);
    return (
        <BrowserRouter history={history}>
            <Switch>
                <SentryRoute exact path="/login" component={Login} />
                <SentryRoute
                    path="/"
                    render={() => {
                        if (token) {
                            return <LayoutMain />;
                        } else {
                            return <Redirect to="/login" />;
                        }
                    }}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
