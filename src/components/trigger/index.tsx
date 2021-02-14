import {createElement, FC} from 'react';
import {Button} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersType} from '@/store';
import {setCollapsed} from '@/store/setting/setting.action';

const Trigger: FC = () => {
    const dispatch = useDispatch();
    const collapsed = useSelector<ReducersType>((state) => state.setting.collapsed);
    return (
        <Button
            type="primary"
            onClick={() => {
                dispatch(setCollapsed(!collapsed));
            }}
        >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
    );
};

export default Trigger;
