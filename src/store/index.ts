import {createStore, combineReducers} from 'redux';
import necessityReducer from '@/store/necessity/necessity.reducer';
import {NecessityActionType} from '@/store/necessity/necessity.action';
import {NecessityState} from '@/store/necessity/necessity.state';

export type ReducersType = {
    necessity: NecessityState;
};

const reducers = combineReducers<ReducersType>({
    necessity: necessityReducer,
});

const store = createStore<ReducersType, NecessityActionType, any, any>(reducers);

export default store;
