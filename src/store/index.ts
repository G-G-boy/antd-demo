import {createStore, combineReducers, Store} from 'redux';
import necessityReducer from '@/store/necessity/necessity.reducer';
import {NecessityActionType} from '@/store/necessity/necessity.action';
import {NecessityState} from '@/store/necessity/necessity.state';
import {SettingState} from '@/store/setting/setting.state';
import {SettingActionType} from '@/store/setting/setting.action';
import settingReducer from '@/store/setting/setting.reducer';
import {createReduxEnhancer} from '@sentry/react';

export type ReducersType = {
    necessity: NecessityState;
    setting: SettingState;
};

const reducers = combineReducers<ReducersType>({
    necessity: necessityReducer,
    setting: settingReducer,
});

const sentryReduxEnhancer = createReduxEnhancer();

const store: Store<ReducersType, NecessityActionType | SettingActionType> = createStore<
    ReducersType,
    NecessityActionType | SettingActionType,
    any,
    any
>(reducers, sentryReduxEnhancer);

export default store;
