import {FC} from 'react';
import {Avatar, Typography} from 'antd';
import {ContactsOutlined, ClusterOutlined, HomeOutlined} from '@ant-design/icons';

const {Title, Text} = Typography;

const UserInfo: FC = () => {
    return (
        <>
            <div className="w-full flex flex-col items-center">
                <Avatar
                    shape="circle"
                    size={80}
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                />
                <Title className="mt-4" level={5}>
                    ggboy
                </Title>
                <div className="w-full text-center font-light">
                    <Text type="secondary">描述</Text>
                </div>
                <div className="m-4 mb-0 w-full font-light">
                    <p>
                        <ContactsOutlined className="mr-2" />
                        前端工程师
                    </p>
                    <p>
                        <ClusterOutlined className="mr-2" />
                        技术部
                    </p>
                    <p>
                        <HomeOutlined className="mr-2" />
                        广州
                    </p>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
