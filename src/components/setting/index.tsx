import {createElement, FC} from 'react';
import {SettingOutlined} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersType} from '@/store';
import {setRightDrawerVisible} from '@/store/setting/setting.action';

const Setting: FC = () => {
    const dispatch = useDispatch();
    const rightDrawerVisible = useSelector<ReducersType>(
        (state) => state.setting.rightDrawerVisible,
    );

    return createElement(SettingOutlined, {
        className: 'text-lg h-full flex items-center ml-4',
        onClick: () => {
            dispatch(setRightDrawerVisible(!rightDrawerVisible));
        },
    });
};

export default Setting;
