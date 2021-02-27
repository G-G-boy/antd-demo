import {createElement, FC, useEffect} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersType} from '@/store';
import {setCollapsed, setMenuDrawerVisible} from '@/store/setting/setting.action';
import {Grid} from 'antd';

const {useBreakpoint} = Grid;

const Trigger: FC = () => {
    const dispatch = useDispatch();
    const collapsed = useSelector<ReducersType>((state) => state.setting.collapsed);
    const {md, xs} = useBreakpoint();

    useEffect(() => {
        dispatch(setCollapsed(!md));
    }, [md, dispatch]);

    const handleClick = () => {
        if (xs) {
            dispatch(setMenuDrawerVisible(true));
        } else {
            dispatch(setCollapsed(!collapsed));
        }
    };

    return createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'text-lg h-full flex items-center ml-4',
        onClick: handleClick,
    });
};

export default Trigger;
