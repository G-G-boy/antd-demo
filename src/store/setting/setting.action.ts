export const setCollapsed = (collapsed: boolean) =>
    <const>{
        type: 'SET_COLLAPSED',
        collapsed,
    };

export const setFixHeader = (fixHeader: boolean) =>
    <const>{
        type: 'SET_FIX_HEADER',
        fixHeader,
    };

export const setMenuDrawerVisible = (menuDrawerVisible: boolean) =>
    <const>{
        type: 'SET_MENU_DRAWER_VISIBLE',
        menuDrawerVisible,
    };

export const setRightDrawerVisible = (rightDrawerVisible: boolean) =>
    <const>{
        type: 'SET_RIGHT_DRAWER_VISIBLE',
        rightDrawerVisible,
    };

export type SettingActionType =
    | ReturnType<typeof setCollapsed>
    | ReturnType<typeof setFixHeader>
    | ReturnType<typeof setMenuDrawerVisible>
    | ReturnType<typeof setRightDrawerVisible>;
