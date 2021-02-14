import {FC} from 'react';
import {Dropdown, Menu, Avatar} from 'antd';
import {UserOutlined, SettingOutlined, LogoutOutlined} from '@ant-design/icons';

const menu = (
    <Menu
        onClick={({key}) => {
            console.log(key);
        }}
    >
        <Menu.Item key="center">
            <UserOutlined />
            个人中心
        </Menu.Item>
        <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
            <LogoutOutlined />
            退出登录
        </Menu.Item>
    </Menu>
);

const Account: FC = () => {
    return (
        <Dropdown overlay={menu}>
            <span className="h-full px-4 flex items-center cursor-pointer transition-all">
                <Avatar
                    className="mr-2"
                    shape="circle"
                    size="small"
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                />
                <span>gavin</span>
            </span>
        </Dropdown>
    );
};

export default Account;
