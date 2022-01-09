import {FC} from 'react';
import {Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {ReducersType} from '@/store';
import {DirectionType} from 'antd/lib/config-provider/context';
import {setDirection} from '@/store/necessity/necessity.action';

const DirectionSwitch: FC = () => {
    const dispatch = useDispatch();
    const direction = useSelector<ReducersType, DirectionType>(
        (state) => state.necessity.direction,
    );

    return (
        <>
            {direction === 'ltr' ? (
                <Button
                    className="me-4"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(setDirection('rtl'));
                    }}
                >
                    RTL
                </Button>
            ) : (
                <Button
                    className="me-4"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(setDirection('ltr'));
                    }}
                >
                    LTR
                </Button>
            )}
        </>
    );
};

export default DirectionSwitch;
