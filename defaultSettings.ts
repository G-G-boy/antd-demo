import {MenuTheme} from 'antd';

interface defaultSettings {
    title: string;
    dark: boolean;
    siderTheme: MenuTheme;
    primaryColor: string;
    fixedHeader: boolean;
}

const defaultSettings: defaultSettings = {
    title: 'antd-tailwind-css-demo',
    dark: false,
    primaryColor: '#61dafb',
    fixedHeader: false,
    siderTheme: 'light',
};

export default defaultSettings;
