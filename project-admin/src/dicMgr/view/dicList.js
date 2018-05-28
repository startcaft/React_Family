

import React, { Component } from 'react';
import { observer,inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import { Row, Col, Tooltip, Table, Icon, Popconfirm, Button,message } from 'antd';
import { breadcrumb as BreadcrumbView } from '../../commons/index';
import DicForm from './dicForm';

import './index.less';


@inject('rootStore')
@observer
class DicList extends Component {
    constructor(props){
        super(props);

        this.userToken = JSON.parse(localStorage.getItem('token'));

        this.dicStore = props.rootStore.dicStore;
        this.commonStore = props.rootStore.commonStore;
        this.formRef = this.formRef.bind(this);
        this.formCancel = this.formCancel.bind(this);
        this.createItem = this.createItem.bind(this);
    }

    /*接受表单页面回传过来的form对象，并且添加一个 form 的实例属性*/
    formRef = (form) => {
        this.form = form;
    };
    /*打开表单，并且设置为新建*/
    createItem(){
        this.dicStore.setVisible(true);
        this.dicStore.setIsUpdate(false);
    }
    /*关闭表单*/
    formCancel(){
        this.dicStore.setVisible(false);
    }
    /*提交表单，用于处理新建逻辑*/
    handleCreate = (e) => {
        e.preventDefault();
        const form = this.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //处理一下post的数据
                const postData = values;
                if(values.pid !== undefined){
                    postData.pid = values.pid[0];
                }
                this.dicStore.saveDic(this.userToken.token,postData);

                let that = this;
                setTimeout(function() {
                    if(that.dicStore.msg !== undefined){
                        message.error(that.dicStore.msg); //失败信息
                    }
                    else {
                        // 刷新Table
                        that.dicStore.getDics(that.userToken.token);
                        // 清空表单
                        form.resetFields();
                    }
                }, 200);
                
            }
        });
    };


    componentDidMount(){
        // 检查当前用户token
        this.commonStore.checkUserToken(this.userToken.token);

        // token有效则进行业务逻辑，否则就清空本地token，然后跳转到/login路由页面
        const that = this;
        setTimeout(() => {
            if(that.commonStore.loginResult){
                that.dicStore.getDics(that.userToken.token);
            }
            else {
                that.props.history.push('/login');
            }
        }, 200);
    }

    render(){
        const questiontxt = () => {
            return (
                <p>
                    <Icon type="plus-circle-o" /> : 新建信息<br />
                    <Icon type="minus-circle-o" /> : 批量删除
                </p>
            )
        };
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        const {visible,isUpdate} = this.dicStore;

        const columns = [{
            title: '字典项名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '字典编码',
            dataIndex: 'code',
            key: 'code',
        }, {
            title: '描述信息',
            dataIndex: 'description',
            key: 'description',
        },{
            title: '排序号',
            dataIndex: 'seq',
            key: 'seq',
        },{
            title: '操作',
            dataIndex: 'opera',
            width:100,
            render: (text, record) =>
                <div className='opera'>
                    <span onClick={() => this.editItem(record.id)}>
                         <Icon type="edit" /> 修改
                    </span><br />
                    <span><Popconfirm title="确定要删除吗?" okText="是" cancelText="否" onConfirm={() => this.handleDel(record.id)}><Icon type="minus-square-o" /> 删除 </Popconfirm></span>
                </div>
        }];
        
        return (
            <div>
                <BreadcrumbView paths={['首页', '字典管理']} />
                <div className='formBody'>
                    <Row gutter={16}>
                        <div className='plus' onClick={this.createItem}>
                            <Icon type="plus-circle" />
                        </div>
                        <div className='minus'>
                            <Popconfirm title="确定要批量删除吗?" okText="是" cancelText="否" onConfirm={this.handleMulDel}>
                                <Icon type="minus-circle" />
                            </Popconfirm>
                        </div>
                        <div className='question'>
                            <Tooltip placement="right" title={questiontxt}>
                                <Icon type="question-circle" />
                            </Tooltip>
                        </div>
                        {/* <div className='btnOpera'>
                            <Button type="primary" onClick={this.btnSearch_Click} style={{ marginRight: '10px' }}>查询</Button>
                            <Button type="primary" onClick={this.handleReset} style={{ background: '#f8f8f8', color: '#108ee9' }}>重置</Button>
                        </div> */}
                    </Row>
                    <Table
                        bordered={true}
                        scroll={{x:'100%'}}
                        rowSelection={rowSelection}
                        loading={this.dicStore.loading}
                        dataSource={this.dicStore.dics.slice()}
                        className='formTable'
                        rowKey="id"
                        columns={columns}
                    />
                    {
                        isUpdate ?
                        <DicForm ref={this.formRef} visible={visible} onCancel={this.formCancel} onCreate={this.handleUpdate} title="修改字典信息" okText="更新"
                        />
                        : <DicForm ref={this.formRef} visible={visible} 
                                onCancel={this.formCancel} onCreate={this.handleCreate} 
                                title="添加字典信息" okText="创建"
                                dics={this.dicStore.dics.slice()}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(DicList);