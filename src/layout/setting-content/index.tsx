import {FC} from 'react';
import {Drawer, Switch, Row, Col, MenuTheme} from 'antd';
import {setRightDrawerVisible, setFixHeader, setSiderTheme} from '@/store/setting/setting.action';
import {useDispatch, useSelector} from 'react-redux';
import {ReducersType} from '@/store';

const SettingContent: FC = () => {
    const dispatch = useDispatch();
    const rightDrawerVisible = useSelector<ReducersType, boolean>(
        (state) => state.setting.rightDrawerVisible,
    );
    const fixHeader = useSelector<ReducersType, boolean>((state) => state.setting.fixHeader);
    const siderTheme = useSelector<ReducersType, MenuTheme>((state) => state.setting.siderTheme);

    return (
        <Drawer
            placement="right"
            closable={false}
            onClose={() => dispatch(setRightDrawerVisible(false))}
            visible={rightDrawerVisible}
        >
            <Row justify="space-around">
                <Col>siderTheme</Col>
                <Col>
                    <Switch
                        checkedChildren={siderTheme}
                        unCheckedChildren={siderTheme}
                        checked={siderTheme === 'dark'}
                        onChange={(checked) => dispatch(setSiderTheme(checked ? 'dark' : 'light'))}
                    />
                </Col>
            </Row>
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
