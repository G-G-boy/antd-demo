import {createStore, combineReducers} from 'redux';
import necessityReducer from '@/store/necessity/necessity.reducer';
import {NecessityActionType} from '@/store/necessity/necessity.action';
import {NecessityState} from '@/store/necessity/necessity.state';
import {SettingState} from '@/store/setting/setting.state';
import {SettingActionType} from '@/store/setting/setting.action';
import settingReducer from '@/store/setting/setting.reducer';

export type ReducersType = {
    necessity: NecessityState;
    setting: SettingState;
};

const reducers = combineReducers<ReducersType>({
    necessity: necessityReducer,
    setting: settingReducer,
});

const store = createStore<ReducersType, NecessityActionType | SettingActionType, any, any>(
    reducers,
);

export default store;
