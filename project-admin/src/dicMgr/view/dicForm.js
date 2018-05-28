

import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber,Cascader } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;


class DicForm extends Component {

    loadDate(dics) {
        const childLoad = (obj) => {
            if (obj.children !== null && obj.children.length > 0) {
                obj.children.forEach(function (obj, index) {
                    obj.value = obj.id;
                    obj.label = obj.name;

                    childLoad(obj);
                })
            }
        }

        if (dics !== null && dics.length > 0) {
            dics.forEach(function (obj, index) {
                obj.value = obj.id;
                obj.label = obj.name;

                childLoad(obj);
            })
            return dics;
        }
        else {
            return [];
        }
    }

    render() {
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };

        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
                cancelText="取消"
            >
                <Form layout="horizontal">
                    <FormItem
                        {...FormItemLayout}
                        label="父级字典项"
                    >
                        {getFieldDecorator('pid', {})(
                            <Cascader expandTrigger="hover" 
                                options={this.loadDate(this.props.dics)} placeholder="父级字典项,不选就是顶级字典项" />
                        )}
                    </FormItem>
                    <FormItem label="字典项名称" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入字典项名称！' }],
                        })(
                            <Input placeholder="字典项名称" />
                        )}
                    </FormItem>
                    <FormItem label="字典项编码" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('code', {})(
                            <Input placeholder="字典项编码，无强制要求" />
                        )}
                    </FormItem>
                    <FormItem label="排序号" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('seq', {})(
                            <InputNumber min={1} max={100} defaultValue={50} value={50} />
                        )}
                    </FormItem>
                    <FormItem label="描述信息" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('description', {})(
                            <TextArea rows={4} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}


export default Form.create()(DicForm);