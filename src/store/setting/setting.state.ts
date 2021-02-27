import defaultSettings from '../../../defaultSettings';

export interface SettingState {
    collapsed: boolean;
    fixHeader: boolean;
    siderTheme: typeof defaultSettings['siderTheme'];
    menuDrawerVisible: boolean;
    rightDrawerVisible: boolean;
}

export const initialSettingState: SettingState = {
    collapsed: false,
    fixHeader: defaultSettings.fixedHeader,
    siderTheme: defaultSettings.siderTheme,
    menuDrawerVisible: false,
    rightDrawerVisible: false,
};
