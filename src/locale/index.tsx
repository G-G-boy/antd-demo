import {FC} from 'react';
import {LangType} from '@/store/necessity/necessity.state';
import {createIntl, createIntlCache, RawIntlProvider, IntlShape} from 'react-intl';
import {useSelector} from 'react-redux';
import {ReducersType} from '@/store';
import zh_cn from '@/locale/langs/zh_cn.json';
import en_us from '@/locale/langs/en_us.json';

const cache = createIntlCache();
let intl: IntlShape;

const messages: {[key in LangType]: {}} = {
    'zh-cn': zh_cn,
    'en-us': en_us,
};

const AppIntlProvider: FC = ({children}) => {
    const lang = useSelector<ReducersType, LangType>((state) => state.necessity.lang);
    intl = createIntl(
        {
            locale: lang,
            messages: messages[lang],
        },
        cache,
    );

    return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
};

export default AppIntlProvider;
export {intl};
