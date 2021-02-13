import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {FC} from 'react';
import {useSelector} from 'react-redux';
import {ReducersType} from '@/store';
import Login from '@/pages/login';
import LayoutMain from '@/layout';

const Router: FC = () => {
    const token = useSelector<ReducersType>((state) => state.necessity.token);
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route
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
