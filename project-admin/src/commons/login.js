/**
 * Created by Administrator on 2018/5/15.
 */

import React, {Component} from 'react';
import '../assets/login.less';
import {Form, Icon, Input, Button, Checkbox, Alert, Spin} from 'antd';
import {withRouter} from "react-router-dom";
import {observer,inject} from 'mobx-react';

const FormItem = Form.Item;


@inject('rootStore')
@observer
class Login extends Component {

    constructor(props){
        super(props);

        this.loginStore = props.rootStore.loginStore;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                // 执行登陆
                this.loginStore.userLogin(values.loginName,values.password);

                let that = this;
                setTimeout(function() { //延迟进入
                    if(that.loginStore.isLoginSuccess){
                        localStorage.setItem("token",JSON.stringify(values));
                        that.props.history.push('/main');
                    }
                }, 200);
            }
        });


    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const {loading,msg} = this.loginStore;
        return (
            loading ? <Spin size="large" className="loading" /> :
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <div className="login-name">startcaft</div>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('loginName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom:'0'}}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float:'right'}}>忘记密码?</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            Or <a href="">现在就去注册!</a>
                        </FormItem>
                    </Form>
                    <a className="githubUrl" href="https://github.com/zhaoyu69/antd-spa"> </a>
                    <Alert
                        message="Warning"
                        description={msg}
                        type="warning"
                        showIcon
                        style={{display:msg === undefined ? 'none' : 'block',marginTop:'10px'}}
                    />
                </div>
            </div>
        );
    }
}


export default withRouter(Form.create()(Login));