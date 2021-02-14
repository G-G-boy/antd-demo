import {FC} from 'react';
import {Drawer, Switch, Row, Col} from 'antd';
import {setRightDrawerVisible, setFixHeader} from '@/store/setting/setting.action';
import {useDispatch, useSelector} from 'react-redux';
import {ReducersType} from '@/store';

const SettingContent: FC = () => {
    const dispatch = useDispatch();
    const rightDrawerVisible = useSelector<ReducersType, boolean>(
        (state) => state.setting.rightDrawerVisible,
    );
    const fixHeader = useSelector<ReducersType, boolean>((state) => state.setting.fixHeader);

    return (
        <Drawer
            placement="right"
            closable={false}
            onClose={() => dispatch(setRightDrawerVisible(false))}
            visible={rightDrawerVisible}
        >
            <Row justify="space-around">
                <Col>固定Header</Col>
                <Col>
                    <Switch
                        checked={fixHeader}
                        onChange={(checked) => dispatch(setFixHeader(checked))}
                    />
                </Col>
            </Row>
        </Drawer>
    );
};

export default SettingContent;
