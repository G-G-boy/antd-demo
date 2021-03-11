import React, {useState, useRef} from 'react';
import {
    Tooltip,
    Input,
    Table,
    Space,
    Button,
    Modal,
    message,
    Menu,
    Card,
    Descriptions,
    Row,
    Col,
    Grid,
    Tree,
} from 'antd';
import {
    QuestionCircleOutlined,
    SearchOutlined,
    PlusOutlined,
    MailOutlined,
} from '@ant-design/icons';
import type {ProColumns, ActionType, ColumnsState} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import PageContainer from '@/components/page-container';
import {useHistory, useRouteMatch} from 'react-router-dom';
import * as Sentry from '@sentry/react';

const {DirectoryTree} = Tree;
const {useBreakpoint} = Grid;

const treeData = [
    {
        title: 'parent 0',
        key: '0-0',
        children: [
            {title: 'leaf 0-0', key: '0-0-0', isLeaf: true},
            {title: 'leaf 0-1', key: '0-0-1', isLeaf: true},
        ],
    },
    {
        title: 'parent 1',
        key: '0-1',
        children: [
            {title: 'leaf 1-0', key: '0-1-0', isLeaf: true},
            {title: 'leaf 1-1', key: '0-1-1', isLeaf: true},
        ],
    },
];

const onSelect = (keys: React.Key[], info: any) => {
    console.log('Trigger Select', keys, info);
};

const onExpand = () => {
    console.log('Trigger Expand');
};

const valueEnum = {
    0: 'close',
    1: 'running',
    2: 'online',
    3: 'error',
};

export type TableListItem = {
    key: number;
    name: string;
    containers: number;
    callNumber: number;
    creator: string;
    status: string;
    createdAt: number;
    progress: number;
    money: number;
    memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
    tableListDataSource.push({
        key: i,
        name: 'AppName',
        containers: Math.floor(Math.random() * 20),
        callNumber: Math.floor(Math.random() * 2000),
        creator: creators[Math.floor(Math.random() * creators.length)],
        // @ts-ignore
        status: valueEnum[Math.floor(Math.random() * 10) % 4],
        createdAt: Date.now() - Math.floor(Math.random() * 2000),
        money: Math.floor(Math.random() * 2000) * i,
        progress: Math.ceil(Math.random() * 100) + 1,
        memo:
            i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
    });
}

const columns: ProColumns<TableListItem>[] = [
    {
        title: '应用名称',
        dataIndex: 'name',
        key: 'name',
        render: (_) => <a>{_}</a>,
        filterDropdown: () => (
            <div style={{padding: 8}}>
                <Input style={{width: 188, marginBottom: 8, display: 'block'}} />
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />
        ),
    },
    {
        title: '创建者',
        dataIndex: 'creator',
        key: 'creator',
        valueEnum: {
            all: {text: '全部'},
            付小小: {text: '付小小'},
            曲丽丽: {text: '曲丽丽'},
            林东东: {text: '林东东'},
            陈帅帅: {text: '陈帅帅'},
            兼某某: {text: '兼某某'},
        },
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        initialValue: 'all',
        filters: true,
        onFilter: true,
        valueEnum: {
            all: {text: '全部', status: 'Default'},
            close: {text: '关闭', status: 'Default'},
            running: {text: '运行中', status: 'Processing'},
            online: {text: '已上线', status: 'Success'},
            error: {text: '异常', status: 'Error'},
        },
    },
    {
        title: (
            <>
                创建时间
                <Tooltip placement="top" title="这是一段描述">
                    <QuestionCircleOutlined style={{marginLeft: 4}} />
                </Tooltip>
            </>
        ),
        width: 140,
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo',
        ellipsis: true,
        copyable: true,
    },
    {
        title: '操作',
        width: 180,
        key: 'option',
        valueType: 'option',
        render: (_, record) => [
            <a key="link">查看</a>,
            <a key="link2">编辑</a>,
            <a
                key="link3"
                onClick={() => {
                    console.log(record);
                }}
            >
                删除
            </a>,
        ],
    },
];

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
    const hide = message.loading('正在添加');
    try {
        await addRule({...fields});
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};

const addRule = async (params: TableListItem) => {
    console.log(params);
    tableListDataSource.push({
        key: 9999,
        name: 'aaaa',
        containers: Math.floor(Math.random() * 20),
        callNumber: Math.floor(Math.random() * 2000),
        creator: creators[Math.floor(Math.random() * creators.length)],
        // @ts-ignore
        status: valueEnum[Math.floor(Math.random() * 10) % 4],
        createdAt: Date.now() - Math.floor(Math.random() * 2000),
        money: Math.floor(Math.random() * 2000) * 2,
        progress: Math.ceil(Math.random() * 100) + 1,
        memo: '简短备注文案',
    });
    return true;
};

const Test3 = () => {
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        name: {
            show: false,
        },

        memo: {
            show: false,
        },
        status: {
            show: false,
        },
    });
    const [key, setKey] = useState('1');
    const actionRef = useRef<ActionType>();
    const history = useHistory();
    const {url} = useRouteMatch();
    const {sm, lg} = useBreakpoint();

    return (
        <PageContainer hasBg={false}>
            <ProTable<TableListItem>
                columns={columns}
                request={(params, sorter, filter) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    console.log(params, sorter, filter);
                    return Promise.resolve({
                        data: tableListDataSource,
                        success: true,
                    });
                }}
                rowKey="key"
                columnsStateMap={columnsStateMap}
                onColumnsStateChange={(map) => setColumnsStateMap(map)}
                pagination={{
                    pageSize: 10,
                    showQuickJumper: true,
                }}
                search={{
                    layout: 'vertical',
                    defaultCollapsed: true,
                }}
                dateFormatter="string"
                toolbar={{
                    title: '标题',
                }}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                tableAlertRender={({selectedRowKeys, selectedRows, onCleanSelected}) => (
                    <Space size={24}>
                        <span>
                            已选 {selectedRowKeys.length} 项
                            <a style={{marginLeft: 8}} onClick={onCleanSelected}>
                                取消选择
                            </a>
                        </span>
                        <span>{`容器数量: ${selectedRows.reduce(
                            (pre, item) => pre + item.containers,
                            0,
                        )} 个`}</span>
                        <span>{`调用量: ${selectedRows.reduce(
                            (pre, item) => pre + item.callNumber,
                            0,
                        )} 次`}</span>
                    </Space>
                )}
                tableAlertOptionRender={({selectedRowKeys}) => {
                    return (
                        <Space size={16}>
                            <a>批量删除</a>
                            <a
                                onClick={() => {
                                    console.log(selectedRowKeys);
                                }}
                            >
                                导出数据
                            </a>
                        </Space>
                    );
                }}
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => handleModalVisible(true)}
                    >
                        新建
                    </Button>,
                    <Button
                        key="button"
                        type="primary"
                        onClick={() => {
                            throw new Error('aaaaaaa');
                            // Sentry.captureException(new Error('mock error'));
                        }}
                    >
                        mock error
                    </Button>,
                ]}
                actionRef={actionRef}
                expandable={{
                    expandedRowRender,
                }}
                tableExtraRender={(_, data) => (
                    <Card>
                        <Descriptions size="small" column={lg ? 3 : sm ? 2 : 1}>
                            <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
                            <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                            <Descriptions.Item label="Association">
                                <a>421421</a>
                            </Descriptions.Item>
                            <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                            <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                        </Descriptions>
                    </Card>
                )}
                params={{key}}
                tableRender={(_, dom) => (
                    <Row gutter={[16, 16]}>
                        <Col lg={6} md={24} sm={24} xs={24}>
                            {/*<Menu
                                style={{height: '100%'}}
                                onSelect={(e) => setKey(e.key as string)}
                                defaultSelectedKeys={['zzzz']}
                                defaultOpenKeys={['sub2']}
                                mode="inline"
                            >
                                <Menu.SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            <MailOutlined />
                                            <span>Navigation One</span>
                                        </span>
                                    }
                                >
                                    <Menu.ItemGroup key="g1" title="Item 1">
                                        <Menu.Item key="1111111">Option 1</Menu.Item>
                                        <Menu.Item key="22222">Option 2</Menu.Item>
                                    </Menu.ItemGroup>
                                    <Menu.ItemGroup key="g2" title="Item 2">
                                        <Menu.Item key="333333">Option 3</Menu.Item>
                                        <Menu.Item key="43555555">Option 4</Menu.Item>
                                    </Menu.ItemGroup>
                                </Menu.SubMenu>
                                <Menu.SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <MailOutlined />
                                            <span>Navigation Two</span>
                                        </span>
                                    }
                                >
                                    <Menu.ItemGroup key="y1" title="Item 1">
                                        <Menu.Item key="yyy">Option 1</Menu.Item>
                                        <Menu.Item key="zzzz">Option 2</Menu.Item>
                                    </Menu.ItemGroup>
                                </Menu.SubMenu>
                            </Menu>*/}
                            <Card style={{height: '100%'}}>
                                <DirectoryTree
                                    multiple
                                    defaultExpandAll
                                    onSelect={onSelect}
                                    onExpand={onExpand}
                                    treeData={treeData}
                                />
                            </Card>
                        </Col>
                        <Col lg={18} md={24} sm={24} xs={24}>
                            {dom}
                        </Col>
                    </Row>
                )}
            />
            <CreateForm
                modalVisible={createModalVisible}
                onCancel={() => handleModalVisible(false)}
            >
                <ProTable<TableListItem, TableListItem>
                    onSubmit={async (value) => {
                        console.log(value);
                        const success = await handleAdd(value);
                        if (success) {
                            handleModalVisible(false);
                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    rowKey="key"
                    type="form"
                    columns={columns}
                />
            </CreateForm>
        </PageContainer>
    );
};

const expandedRowRender = () => {
    const data: any[] = [];
    for (let i = 0; i < 3; i += 1) {
        data.push({
            key: i,
            date: '2014-12-24 23:12:00',
            name: 'This is production name',
            upgradeNum: 'Upgraded: 56',
        });
    }
    return (
        <ProTable
            columns={[
                {title: 'Date', dataIndex: 'date', key: 'date'},
                {title: 'Name', dataIndex: 'name', key: 'name'},
                {title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum'},
                {
                    title: 'Action',
                    dataIndex: 'operation',
                    key: 'operation',
                    valueType: 'option',
                    render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
                },
            ]}
            headerTitle={false}
            search={false}
            options={false}
            dataSource={data}
            pagination={false}
        />
    );
};

interface CreateFormProps {
    modalVisible: boolean;
    onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
    const {modalVisible, onCancel} = props;

    return (
        <Modal
            destroyOnClose
            title="添加"
            visible={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
        >
            {props.children}
        </Modal>
    );
};

export default Test3;
