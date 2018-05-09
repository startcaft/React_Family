/**
 * Created by startcaft on 2018/4/29.
 */

import React, { Component } from 'react';
import {
    Layout,
    Row,
    Col,
    Button,
    Menu,
    Dropdown,
    Avatar,
    Icon,
    Modal,
    Input,
    message,
    Form
} from 'antd';
import {menus as menuArray} from '../../constants/menus';
import { withRouter } from 'react-router-dom';
import { observer,inject } from 'mobx-react';
import '../../assets/css/header.css'
import BlogMenu from './blogMenu';

const FormItem = Form.Item;


@inject('rootStore')
@observer
class BlogHeader extends Component {
    constructor(props){
        super(props);

        this.loginStore = props.rootStore.loginStore;
        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showLoginModal = this.showLoginModal.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);

        this.usernameValue = '';
    }

    onValueChange(e){
        console.log(e.target.value);
    }

    showLoginModal(){
        this.loginStore.showModel();
    }

    closeLoginModal(){
        this.loginStore.closeModel();
    }

    handleChange(event){
        // this.setState({
        //     [event.target.name]: event.target.value
        // })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });

        const formData = this.props.form.getFieldsValue();

        this.loginStore.userLogin(formData.username,formData.password);
        if(!this.loginStore.msg){
            
            this.closeLoginModal();
        }
        else {
            message.warn(this.loginStore.msg)
        }
    }

    handleLogout(){
        // localStorage.removeItem('token');
        // this.setState({
        //     token:''
        // });

        // this.props.history.push('/index');
    }

    render(){
        const { Header } = Layout;
        const {token,isShow,loading} = this.loginStore;
        const { getFieldDecorator } = this.props.form;

        return(
            <Header className="header-container">
                <Row>
                    <Col
                        lg={{span: 4}}
                        md={{span: 4}}
                        xs={{span: 0}}
                    >
                        <div className="logo">
                        </div>
                    </Col>
                    <Col
                        lg={{span: 14}}
                        md={{span: 14}}
                        xs={{span: 0}}
                    >
                        <BlogMenu menuArray={menuArray}/>
                    </Col>

                    <Col
                        lg={{span: 6}}
                        md={{span: 6}}
                        xs={{span: 14}}
                    >
                        <div
                            className="nav-auth"
                            style={{display: token !== null ? 'none' : 'block'}}
                        >
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                style={{marginRight: 20}}
                                onClick={this.showLoginModal}
                            >
                                登录
                            </Button>
                        </div>

                        <div
                            className="user-info"
                            style={{display: token !== null ? 'flex' : 'none',justifyContent:'space-evenly',alignItems:'center'}}
                        >
                            <Dropdown
                                placement="bottomCenter"
                                overlay=
                                    {
                                        <Menu>
                                            <Menu.Item>
                                              <span
                                                  className="user-logout"
                                                  onClick={() => this.handleLogout()}
                                              >
                                                退出登录
                                              </span>
                                            </Menu.Item>
                                        </Menu>
                                    }
                            >
                                <Avatar
                                    className="user-avatar"
                                    shape="square"
                                    size="large"
                                    style={{backgroundColor: 'rgb(255, 191, 0)'}}
                                >
                                    {token !== null ? 'admin' : null}
                                </Avatar>
                            </Dropdown>
                            <Button
                                ghost
                                type="danger"
                                size="small"
                                // disabled={this.state.isWrite ? false : true}
                                // onClick={() => this.props.history.push('/write')}
                            >
                                发表
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Modal
                    title="用户登陆"
                    visible={isShow}
                    onCancel={() => this.closeLoginModal()}
                    width={320}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入你的用户名!' }],
                            })(
                                <Input style={{marginBottom: 20}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入你的密码!' }],
                            })(
                                <Input style={{marginBottom: 20}} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{width: '100%'}} loading={loading} htmlType="submit" className="login-submit">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </Header>
        )
    }
}

export default withRouter(Form.create()(BlogHeader));