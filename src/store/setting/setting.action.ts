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

export type SettingActionType = ReturnType<typeof setCollapsed> | ReturnType<typeof setFixHeader>;
