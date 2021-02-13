import {isEmpty} from 'lodash';
import {LangType} from '@/store/necessity/necessity.state';

/**
 * Key
 */
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

const LANGUAGE_KEY = 'APP_LANGUAGE';

const getItem = (key: string): string => localStorage.getItem(key) ?? '';

const removeItem = (key: string): void => localStorage.removeItem(key);

const setItem = (key: string, val: string): void => {
    if (!isEmpty(val)) {
        localStorage.setItem(key, val);
    } else {
        removeItem(key);
    }
};

export const clear = () => localStorage.clear();

const getAccessToken = (): string => getItem(ACCESS_TOKEN_KEY) ?? '';

const setAccessToken = (val: string): void => setItem(ACCESS_TOKEN_KEY, val);

const getRefreshToken = (): string => getItem(REFRESH_TOKEN_KEY) ?? '';

const setRefreshToken = (val: string): void => setItem(REFRESH_TOKEN_KEY, val);

const setLanguage = (lang: LangType): void => setItem(LANGUAGE_KEY, lang);

const getLanguage = (): LangType => (localStorage.getItem(LANGUAGE_KEY) as LangType) ?? 'zh-cn';

export {getAccessToken, setAccessToken, getRefreshToken, setRefreshToken, setLanguage, getLanguage};
