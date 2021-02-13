import * as storageService from '@/util/storage.service';

export interface NecessityState {
    isLoading: boolean;
    lang: LangType;
    token: string;
    refreshToken: string;
}

export const initialNecessityState: NecessityState = {
    isLoading: false,
    lang: storageService.getLanguage(),
    token: storageService.getAccessToken(),
    refreshToken: storageService.getRefreshToken(),
};

export type LangType = 'zh-cn' | 'en-us';
