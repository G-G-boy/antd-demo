import {FC} from 'react';
import {Form, Button, Input} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setTokenAndRefreshToken} from '@/store/necessity/necessity.action';
import {post} from '@/util/http';
import styles from './index.module.less';

interface LoginData {
    token: string;
    refreshToken: string;
}

const Login: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {formatMessage} = useIntl();

    const onFinish = (val: any) => {
        post<LoginData>('login', val).then((res) => {
            const {token, refreshToken} = res.data.data;
            dispatch(setTokenAndRefreshToken(token, refreshToken));
            history.push('/');
        });
    };

    return (
        <div className={styles.login_container}>
            <Form className={styles.login_content} name="basic" onFinish={onFinish}>
                <div className={styles.login_title}>
                    <h2>{formatMessage({id: 'login', defaultMessage: '登录'})}</h2>
                </div>
                <Form.Item
                    name="username"
                    initialValue="admin"
                    rules={[
                        {
                            required: true,
                            message: formatMessage({
                                id: 'login.input.username.please',
                                defaultMessage: '请输入用户名',
                            }),
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder={formatMessage({
                            id: 'login.username',
                            defaultMessage: '用户名',
                        })}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    initialValue="admin"
                    rules={[
                        {
                            required: true,
                            message: formatMessage({
                                id: 'login.input.password.please',
                                defaultMessage: '请输入密码',
                            }),
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        type="password"
                        placeholder={formatMessage({id: 'login.password', defaultMessage: '密码'})}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        {formatMessage({id: 'login', defaultMessage: '登录'})}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
