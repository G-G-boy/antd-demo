import {FC} from 'react';
import PageContainer from '@/components/page-container';
import useSWR from 'swr';
import {getFakeList, BasicListItemDataType, postFakeList} from '../list-services';
import {Table, Space, Card} from 'antd';
import {FormattedDate} from 'react-intl';

const BasicTable: FC = () => {
    const {data, isValidating, mutate} = useSWR(getFakeList.name, () => getFakeList({count: 5}));

    return (
        <PageContainer hasBg={false}>
            <Card>
                <Table<BasicListItemDataType>
                    bordered
                    loading={isValidating}
                    title={() => <h3>title</h3>}
                    dataSource={data}
                    rowKey={(record) => record.id}
                    expandable={{
                        expandedRowRender: (record) => record.content,
                    }}
                    columns={[
                        {
                            title: '标题',
                            dataIndex: 'title',
                            key: 'title',
                        },
                        {
                            title: '创建人',
                            dataIndex: 'owner',
                            key: 'owner',
                            render: (text) => <a>{text}</a>,
                        },
                        {
                            title: '创建时间',
                            dataIndex: 'createdAt',
                            key: 'createdAt',
                            render: (createdAt) => <FormattedDate value={createdAt} />,
                        },
                        {
                            title: 'star',
                            dataIndex: 'star',
                            key: 'star',
                        },
                        {
                            title: '操作',
                            dataIndex: 'action',
                            key: 'action',
                            render: (_, record) => {
                                const handleDelete = async () => {
                                    const newData = data!.filter((item) => item.id !== record.id);
                                    //mock数据,不重新验证
                                    mutate(newData, false).then();
                                    const deletedData = await postFakeList({
                                        id: record.id,
                                        method: 'delete',
                                    });
                                    //mock数据,不重新验证
                                    mutate(deletedData, false);
                                };

                                const handleEdit = () => {};

                                return (
                                    <Space size="middle">
                                        <a onClick={handleEdit}>编辑</a>
                                        <a onClick={handleDelete}>删除</a>
                                    </Space>
                                );
                            },
                        },
                    ]}
                />
            </Card>
        </PageContainer>
    );
};

export default BasicTable;
