import {FC, ReactNode, useState, useEffect} from 'react';
import {Badge, Dropdown, Tabs, Spin, List, Avatar} from 'antd';
import {BellOutlined} from '@ant-design/icons';

interface NoticeListData {
    avatar?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
}

const data: NoticeListData[] = [
    {
        avatar: (
            <Avatar
                shape="circle"
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
        ),
        title: '啦啦啦啦啦啦啦啦啦啦',
        description: 'aaa',
    },
    {
        avatar: (
            <Avatar
                shape="circle"
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
        ),
        title: '啦啦啦啦啦啦啦啦啦啦',
        description: 'bbb',
    },
];

const TabList = (
    <List<NoticeListData>
        dataSource={data}
        renderItem={(item, i) => {
            return (
                <List.Item className="hover:bg-blue-50" key={i}>
                    <List.Item.Meta
                        className="px-4"
                        avatar={item.avatar}
                        title={item.title}
                        description={item.description}
                    />
                </List.Item>
            );
        }}
    />
);

const {TabPane} = Tabs;

const Overlay = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    return (
        <Spin spinning={loading} delay={300}>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="通知" key="notification">
                    {TabList}
                </TabPane>
                <TabPane tab="消息" key="message">
                    {TabList}
                </TabPane>
            </Tabs>
        </Spin>
    );
};

const NoticeView: FC = () => {
    return (
        <Dropdown
            overlay={<Overlay />}
            overlayClassName="w-80 bg-white shadow-xl"
            trigger={['click']}
        >
            <div className="h-full flex items-center">
                <Badge className="ml-4 mr-2 cursor-pointer" count={10}>
                    <BellOutlined className="text-lg h-full flex items-center" />
                </Badge>
            </div>
        </Dropdown>
    );
};

export default NoticeView;
