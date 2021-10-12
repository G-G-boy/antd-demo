import {SettingActionType} from '@/store/setting/setting.action';
import {SettingState, initialSettingState} from '@/store/setting/setting.state';
import {Reducer} from 'redux';

const settingReducer: Reducer<SettingState, SettingActionType> = (
    state = initialSettingState,
    action,
) => {
    switch (action.type) {
        case 'SET_COLLAPSED':
            return {...state, collapsed: action.collapsed};
        case 'SET_FIX_HEADER':
            return {...state, fixHeader: action.fixHeader};
        case 'SET_MENU_DRAWER_VISIBLE':
            return {...state, menuDrawerVisible: action.menuDrawerVisible};
        case 'SET_RIGHT_DRAWER_VISIBLE':
            return {...state, rightDrawerVisible: action.rightDrawerVisible};
        case 'SET_SIDER_THEME':
            return {...state, siderTheme: action.siderTheme};
        default:
            return state;
    }
};

export default settingReducer;
