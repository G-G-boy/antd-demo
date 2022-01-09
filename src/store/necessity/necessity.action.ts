import {LangType} from '@/store/necessity/necessity.state';
import * as storageService from '@/util/storage.service';
import {DirectionType} from 'antd/lib/config-provider/context';

export const setTokenAndRefreshToken = (token: string, refreshToken: string) => {
    storageService.setAccessToken(token);
    storageService.setRefreshToken(refreshToken);
    return <const>{
        type: 'SET_TOKEN_AND_REFRESH_TOKEN',
        token,
        refreshToken,
    };
};

export const setToken = (token: string) => {
    storageService.setAccessToken(token);
    return <const>{
        type: 'SET_TOKEN',
        token,
    };
};

export const setLoading = (isLoading: boolean) =>
    <const>{
        type: 'SET_LOADING',
        isLoading,
    };

export const setLang = (lang: LangType) => {
    storageService.setLanguage(lang);
    return <const>{
        type: 'SET_LANG',
        lang,
    };
};

export const setDirection = (direction: DirectionType) => {
    return <const>{
        type: 'SET_DIR',
        direction,
    };
};

export type NecessityActionType =
    | ReturnType<typeof setTokenAndRefreshToken>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setToken>
    | ReturnType<typeof setLang>
    | ReturnType<typeof setDirection>;
