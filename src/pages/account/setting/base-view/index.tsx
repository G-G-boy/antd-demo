import {FC} from 'react';
import {Avatar, Upload, Form, Button, Input, Select} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const {Option} = Select;

const AvatarView = () => {
    return (
        <div className="max-w-md flex flex-col items-center">
            <Avatar
                shape="circle"
                size={140}
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
            <Upload className="my-4" showUploadList={false}>
                <Button>
                    <UploadOutlined />
                    更换头像
                </Button>
            </Upload>
        </div>
    );
};

const BaseView: FC = () => {
    const onFinish = (val: any) => {
        console.log(val);
    };
    return (
        <>
            <AvatarView />
            <div className="max-w-md">
                <Form
                    layout="vertical"
                    initialValues={{
                        email: 'aaaa@gg.com',
                        name: 'ggboy',
                        profile: '',
                        country: '中国',
                        address: '广东',
                    }}
                    onFinish={onFinish}
                    hideRequiredMark
                >
                    <Form.Item
                        name="email"
                        label={'邮箱'}
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱地址',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label={'昵称'}
                        rules={[
                            {
                                required: true,
                                message: '请输入昵称',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="profile"
                        label={'个人简介'}
                        rules={[
                            {
                                required: true,
                                message: '请输入个人简介',
                            },
                        ]}
                    >
                        <Input.TextArea placeholder={'个人简介'} rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="country"
                        label={'国家/地区'}
                        rules={[
                            {
                                required: true,
                                message: '请输入国家/地区',
                            },
                        ]}
                    >
                        <Select style={{maxWidth: 220}}>
                            <Option value="China">中国</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label={'街道地址'}
                        rules={[
                            {
                                required: true,
                                message: '请输入街道地址',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        更新基本信息
                    </Button>
                </Form.Item>
            </div>
        </>
    );
};

export default BaseView;
