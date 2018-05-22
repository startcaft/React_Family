/**
 * Created by Administrator on 2018/5/22.
 */

import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const options = [];

class RoleForm extends Component{
    constructor(props){
        super(props);
    }
    handleWebsiteChange = (value) => {
        // let autoCompleteResult;
        // if (!value) {
        //     autoCompleteResult = [];
        // } else {
        //     autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
        // }
        // this.setState({ autoCompleteResult });
    };
    render(){
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
                    <FormItem label="角色名称" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入角色名称！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="角色别名" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('alias', {
                            rules: [{ required: true, message: '请输入角色别名！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="职责描述" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('desc', {})(
                            <TextArea rows={4} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(RoleForm);