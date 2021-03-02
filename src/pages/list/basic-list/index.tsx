import {FC, useEffect, useState} from 'react';
import {Card, Radio, Input, Button, List, Avatar, Dropdown, Menu, Modal, Progress} from 'antd';
import {PlusOutlined, DownOutlined} from '@ant-design/icons';
import PageContainer from '@/components/page-container';
import OperationModal from '@/pages/list/basic-list/operation-modal';
import moment from 'moment';
import {getFakeList, postFakeList, BasicListItemDataType} from '@/pages/list/list-services';
import styles from './index.module.less';

const extraContent = (
    <div>
        <Radio.Group defaultValue="all">
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="progress">进行中</Radio.Button>
            <Radio.Button value="waiting">等待中</Radio.Button>
        </Radio.Group>
        <Input.Search className="w-40 ml-4" placeholder="请输入" onSearch={() => ({})} />
    </div>
);

const ListContent = ({
    data: {owner, createdAt, percent, status},
}: {
    data: BasicListItemDataType;
}) => (
    <>
        <div className={styles.list_content_item}>
            <span>Owner</span>
            <p>{owner}</p>
        </div>
        <div className={styles.list_content_item}>
            <span>开始时间</span>
            <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.list_content_item}>
            <Progress percent={percent} status={status} strokeWidth={6} style={{width: 180}} />
        </div>
    </>
);

const BasicList: FC = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Array<BasicListItemDataType>>([]);

    const [done, setDone] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        getFakeList({count: 5}).then((data) => {
            setList(data);
            setLoading(false);
        });
    }, []);

    const showModal = () => {
        setVisible(true);
        setCurrent(undefined);
    };

    const showEditModal = (item: BasicListItemDataType) => {
        setVisible(true);
        setCurrent(item);
    };

    const MoreBtn: FC<{
        item: BasicListItemDataType;
    }> = ({item}) => (
        <Dropdown
            overlay={
                <Menu
                    onClick={({key}) => {
                        if (key === 'edit') {
                            showEditModal(item);
                        } else if (key === 'delete') {
                            Modal.confirm({
                                title: '删除任务',
                                content: '确定删除该任务吗？',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {
                                    setLoading(true);
                                    postFakeList({
                                        id: item.id,
                                        method: 'delete',
                                    }).then((data) => {
                                        setList(data);
                                        setLoading(false);
                                    });
                                },
                            });
                        }
                    }}
                >
                    <Menu.Item key="edit">编辑</Menu.Item>
                    <Menu.Item key="delete">删除</Menu.Item>
                </Menu>
            }
        >
            <a>
                更多 <DownOutlined />
            </a>
        </Dropdown>
    );

    const handleDone = () => {
        setDone(false);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleSubmit = (values: BasicListItemDataType) => {
        const id = current ? current.id : '';

        setDone(true);
        setLoading(true);

        if (!id) {
            postFakeList({
                method: 'post',
                item: values,
            }).then((data) => {
                setList(data);
                setLoading(false);
            });
            return;
        }

        postFakeList({
            id: id,
            method: 'update',
            item: values,
        }).then((data) => {
            setList(data);
            setLoading(false);
        });
    };

    return (
        <>
            <PageContainer>
                <Card bordered={false} title="基本列表" extra={extraContent}>
                    <Button className="w-full mb-2" type="dashed" onClick={showModal}>
                        <PlusOutlined />
                        添加
                    </Button>
                    <List<BasicListItemDataType>
                        size="large"
                        rowKey="id"
                        dataSource={list}
                        loading={loading}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSize: 5,
                            total: 50,
                        }}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <a
                                        key="edit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            showEditModal(item);
                                        }}
                                    >
                                        编辑
                                    </a>,
                                    <MoreBtn key="more" item={item} />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            className="w-12 h-12"
                                            src={item.logo}
                                            shape="square"
                                            size="large"
                                        />
                                    }
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.subDescription}
                                />
                                <ListContent data={item} />
                            </List.Item>
                        )}
                    />
                </Card>
            </PageContainer>
            <OperationModal
                done={done}
                current={current}
                visible={visible}
                onDone={handleDone}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default BasicList;
