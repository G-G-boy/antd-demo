import {FC} from 'react';
import {Form, Button, Input} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import SelectLang from '@/components/select-lang';
import {useIntl} from 'react-intl';
import './index.scss';

const Login: FC = () => {
    const {formatMessage} = useIntl();
    const onFinish = (val: any) => {
        console.log(val);
    };

    return (
        <div className="login-container">
            <SelectLang />
            <Form className="login-content" name="basic" onFinish={onFinish}>
                <div className="login-title">
                    <h2>{formatMessage({id: 'login'})}</h2>
                </div>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: formatMessage({id: 'login.input.username.please'}),
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder={formatMessage({id: 'login.username'})}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: formatMessage({id: 'login.input.password.please'}),
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        type="password"
                        placeholder={formatMessage({id: 'login.password'})}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        {formatMessage({id: 'login'})}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
