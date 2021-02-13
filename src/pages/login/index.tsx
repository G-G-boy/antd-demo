import {FC} from 'react';
import {Form, Button, Input} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './index.scss';

const Login: FC = () => {
    const onFinish = (val: any) => {
        console.log(val);
    };

    return (
        <div className="login-container">
            <Form className="login-content" name="basic" onFinish={onFinish}>
                <div className="login-title">
                    <h2>登录</h2>
                </div>
                <Form.Item name="username" rules={[{required: true, message: '请输入账号'}]}>
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]}>
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
