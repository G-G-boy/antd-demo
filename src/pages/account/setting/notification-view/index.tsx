import {FC} from 'react';
import {List, Switch} from 'antd';

const getListData = () => {
    const actions = <Switch defaultChecked />;
    return [
        {
            title: '账户密码',
            description: '其他用户的消息将以站内信的形式通知',
            actions: [actions],
        },
        {
            title: '系统消息',
            description: '系统消息将以站内信的形式通知',
            actions: [actions],
        },
    ];
};

const NotificationView: FC = () => {
    const data = getListData();
    return (
        <List<Unpacked<typeof data>>
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item actions={item.actions}>
                    <List.Item.Meta title={item.title} description={item.description} />
                </List.Item>
            )}
        />
    );
};

export default NotificationView;
