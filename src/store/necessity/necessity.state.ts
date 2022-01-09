import * as storageService from '@/util/storage.service';
import {DirectionType} from 'antd/lib/config-provider/context';

export interface NecessityState {
    isLoading: boolean;
    lang: LangType;
    direction: DirectionType;
    token: string;
    refreshToken: string;
}

export const initialNecessityState: NecessityState = {
    isLoading: false,
    lang: storageService.getLanguage(),
    direction: 'ltr',
    token: storageService.getAccessToken(),
    refreshToken: storageService.getRefreshToken(),
};

export type LangType = 'zh-cn' | 'en-us';
