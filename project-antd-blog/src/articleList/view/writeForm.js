/**
 * Created by startcaft on 2018/5/5.
 */

import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, Col, Cascader} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../actions';
import marked from 'marked'

class WriteForm extends Component {

    constructor(props) {
        super(props);

        this.getHtml = this.getHtml.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchDics(9));
    }

    getHtml(e){
        this.refs.htmlDiv.innerHTML = marked(e.target.value);
    }

    loadDate(dics){

        const childLoad = (obj) => {
            if(obj.children !== null && obj.children.length > 0){
                obj.children.forEach(function (obj, index) {
                    obj.value = obj.id;
                    obj.label = obj.name;

                    childLoad(obj);
                })
            }
        }

        if(dics !== null && dics.length > 0){
            dics.forEach(function (obj,index) {
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
        console.log(this.loadDate(this.props.dics))
        const FormItem = Form.Item;
        const {TextArea} = Input;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <Col
                lg={{span: 16, offset: 4}}
                md={{span: 16, offset: 4}}
                xs={{span: 24}}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">

                    <FormItem
                        {...formItemLayout}
                        label="文章分类"
                    >
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: '请选择一个文章分类'}],
                        })(
                            <Cascader expandTrigger="hover" options={this.loadDate(this.props.dics)} placeholder="文章分类" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="文章标题"
                    >
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: '请输入一个明确的标题'}],
                        })(
                            <Input placeholder="文章标题"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="文章摘要"
                    >
                        {getFieldDecorator('description', {
                            rules: [{required: true, message: '请输入文章的摘要'}],
                        })(
                            <TextArea rows={4} placeholder="文章摘要"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="文章内容"
                    >
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: '请输入文章的内容'}],
                        })(
                            <TextArea rows={20} placeholder="文章内容"/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            发表
                        </Button>
                    </FormItem>
                </Form>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dics: state.articlesState.dics
    }
}

export default connect(mapStateToProps)(Form.create()(WriteForm));