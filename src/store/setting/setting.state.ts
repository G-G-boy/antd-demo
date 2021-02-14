export interface SettingState {
    collapsed: boolean;
    fixHeader: boolean;
    menuDrawerVisible: boolean;
    rightDrawerVisible: boolean;
}

export const initialSettingState: SettingState = {
    collapsed: false,
    fixHeader: false,
    menuDrawerVisible: false,
    rightDrawerVisible: false,
};
