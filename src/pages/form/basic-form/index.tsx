import {FC, useState} from 'react';
import PageContainer from '@/components/page-container';
import {InfoCircleOutlined} from '@ant-design/icons';
import {Button, Card, Input, Form, InputNumber, Radio, Select, Tooltip, DatePicker} from 'antd';
import {FormattedMessage, useIntl} from 'react-intl';
import {useHistory} from 'react-router-dom';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

const BasicForm: FC = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [showPublicUsers, setShowPublicUsers] = useState(false);
    const {formatMessage} = useIntl();

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 7},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 12},
            md: {span: 10},
        },
    };
    const submitFormLayout = {
        wrapperCol: {
            xs: {span: 24, offset: 0},
            sm: {span: 10, offset: 7},
        },
    };

    const onFinish = (values: {[key: string]: any}) => {
        console.log(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onValuesChange = (changedValues: {[key: string]: any}) => {
        const {publicType} = changedValues;
        if (publicType) setShowPublicUsers(publicType === '2');
    };

    return (
        <PageContainer hasBg={false}>
            <Card bordered={false}>
                <Form
                    hideRequiredMark
                    style={{marginTop: 8}}
                    form={form}
                    name="basic"
                    initialValues={{public: '1'}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onValuesChange={onValuesChange}
                >
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="formandbasic-form.title.label" />}
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: formatMessage({id: 'formandbasic-form.title.required'}),
                            },
                        ]}
                    >
                        <Input
                            placeholder={formatMessage({id: 'formandbasic-form.title.placeholder'})}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="formandbasic-form.date.label" />}
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: formatMessage({id: 'formandbasic-form.date.required'}),
                            },
                        ]}
                    >
                        <RangePicker
                            style={{width: '100%'}}
                            placeholder={[
                                formatMessage({id: 'formandbasic-form.placeholder.start'}),
                                formatMessage({id: 'formandbasic-form.placeholder.end'}),
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="formandbasic-form.goal.label" />}
                        name="goal"
                        rules={[
                            {
                                required: true,
                                message: formatMessage({id: 'formandbasic-form.goal.required'}),
                            },
                        ]}
                    >
                        <TextArea
                            style={{minHeight: 32}}
                            placeholder={formatMessage({id: 'formandbasic-form.goal.placeholder'})}
                            rows={4}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                <FormattedMessage id="formandbasic-form.client.label" />
                                <em className="not-italic text-gray-400">
                                    <FormattedMessage id="formandbasic-form.form.optional" />
                                    <Tooltip
                                        title={
                                            <FormattedMessage id="formandbasic-form.label.tooltip" />
                                        }
                                    >
                                        <InfoCircleOutlined style={{marginRight: 4}} />
                                    </Tooltip>
                                </em>
                            </span>
                        }
                        name="client"
                    >
                        <Input
                            placeholder={formatMessage({
                                id: 'formandbasic-form.client.placeholder',
                            })}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                <FormattedMessage id="formandbasic-form.weight.label" />
                                <em className="not-italic text-gray-400">
                                    <FormattedMessage id="formandbasic-form.form.optional" />
                                </em>
                            </span>
                        }
                    >
                        <FormItem name="weight" noStyle>
                            <InputNumber
                                placeholder={formatMessage({
                                    id: 'formandbasic-form.weight.placeholder',
                                })}
                                min={0}
                                max={100}
                            />
                        </FormItem>
                        <span className="ml-2">%</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="formandbasic-form.public.label" />}
                        help={<FormattedMessage id="formandbasic-form.label.help" />}
                        name="publicType"
                    >
                        <div className="m-0 sm:mt-1.5">
                            <Radio.Group>
                                <Radio value="1">
                                    <FormattedMessage id="formandbasic-form.radio.public" />
                                </Radio>
                                <Radio value="2">
                                    <FormattedMessage id="formandbasic-form.radio.partially-public" />
                                </Radio>
                                <Radio value="3">
                                    <FormattedMessage id="formandbasic-form.radio.private" />
                                </Radio>
                            </Radio.Group>
                            <FormItem style={{marginBottom: 0}} name="publicUsers">
                                <Select
                                    mode="multiple"
                                    placeholder={formatMessage({
                                        id: 'formandbasic-form.publicUsers.placeholder',
                                    })}
                                    style={{
                                        margin: '8px 0',
                                        display: showPublicUsers ? 'block' : 'none',
                                    }}
                                >
                                    <Option value="1">
                                        <FormattedMessage id="formandbasic-form.option.A" />
                                    </Option>
                                    <Option value="2">
                                        <FormattedMessage id="formandbasic-form.option.B" />
                                    </Option>
                                    <Option value="3">
                                        <FormattedMessage id="formandbasic-form.option.C" />
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                    </FormItem>
                    <MyFormItem />
                    <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                        <Button type="primary" htmlType="submit">
                            <FormattedMessage id="formandbasic-form.form.submit" />
                        </Button>
                        <Button
                            style={{marginLeft: 8}}
                            onClick={() => {
                                history.push(`/account/setting`);
                            }}
                        >
                            <FormattedMessage id="formandbasic-form.form.save" />
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        </PageContainer>
    );
};

const MyFormItem: FC = () => {
    return (
        <Form.Item name="xxxxxx">
            <>
                <Input />
                <OtherFormItem />
            </>
        </Form.Item>
    );
};

const OtherFormItem: FC = () => {
    return (
        <Form.Item name="yyyyyyyy">
            <Input />
        </Form.Item>
    );
};

export default BasicForm;
