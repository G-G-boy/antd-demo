import {NecessityState, initialNecessityState} from '@/store/necessity/necessity.state';
import {NecessityActionType} from '@/store/necessity/necessity.action';
import {Reducer} from 'redux';

const necessityReducer: Reducer<NecessityState, NecessityActionType> = (state, action) => {
    if (state === undefined) {
        state = initialNecessityState;
    }
    switch (action.type) {
        case 'SET_TOKEN_AND_REFRESH_TOKEN':
            return {...state, token: action.token, refreshToken: action.refreshToken};
        case 'SET_LOADING':
            return {...state, isLoading: action.isLoading};
        case 'SET_TOKEN':
            return {...state, token: action.token};
        case 'SET_LANG':
            return {...state, lang: action.lang};
        default:
            return state;
    }
};

export default necessityReducer;
