import {FC, useState} from 'react';
import {Menu, Typography, Grid} from 'antd';
import PageContainer from '@/components/page-container';
import BaseView from './base-view';
import NotificationView from './notification-view';

const {Item} = Menu;
const {useBreakpoint} = Grid;

const menuMap = {
    base: '基本设置',
    notification: '消息设置',
};

type MenuKeyType = keyof typeof menuMap;

const renderMenu = () => {
    return Object.keys(menuMap).map((key) => <Item key={key}>{menuMap[key]}</Item>);
};

const AccountSetting: FC = () => {
    const [selectedKey, setSelectedKey] = useState<MenuKeyType>('base');
    const {sm} = useBreakpoint();

    const renderMain = () => {
        switch (selectedKey) {
            case 'base':
                return <BaseView />;
            case 'notification':
                return <NotificationView />;
            default:
                return null;
        }
    };

    return (
        <PageContainer hasBg={false}>
            <div className="flex flex-col sm:flex-row bg-white py-6">
                <div className="w-full sm:w-52">
                    <Menu
                        className="h-full"
                        mode={sm ? 'inline' : 'horizontal'}
                        selectedKeys={[selectedKey]}
                        onClick={({key}) => {
                            setSelectedKey(key as MenuKeyType);
                        }}
                    >
                        {renderMenu()}
                    </Menu>
                </div>
                <div className="flex-1 mx-12 my-2">
                    <div className="mt-8 sm:mt-0">
                        <Typography.Title level={4}>{menuMap[selectedKey]}</Typography.Title>
                    </div>
                    {renderMain()}
                </div>
            </div>
        </PageContainer>
    );
};

export default AccountSetting;
