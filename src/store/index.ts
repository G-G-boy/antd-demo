import {createStore, combineReducers, Store, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import necessityReducer from '@/store/necessity/necessity.reducer';
import {NecessityActionType} from '@/store/necessity/necessity.action';
import {NecessityState} from '@/store/necessity/necessity.state';
import {SettingState} from '@/store/setting/setting.state';
import {SettingActionType} from '@/store/setting/setting.action';
import settingReducer from '@/store/setting/setting.reducer';
import {createReduxEnhancer} from '@sentry/react';
import rootSaga from '@/store/saga';

export type ReducersType = {
    necessity: NecessityState;
    setting: SettingState;
};

const reducers = combineReducers<ReducersType>({
    necessity: necessityReducer,
    setting: settingReducer,
});

const sentryReduxEnhancer = createReduxEnhancer();

const sagaMiddleware = createSagaMiddleware();

const store: Store<ReducersType, NecessityActionType | SettingActionType> = createStore<
    ReducersType,
    NecessityActionType | SettingActionType,
    any,
    any
>(reducers, compose(applyMiddleware(sagaMiddleware), sentryReduxEnhancer));

sagaMiddleware.run(rootSaga);

export default store;
