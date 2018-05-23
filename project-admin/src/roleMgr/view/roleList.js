
import React, { Component } from 'react';
import { observer,inject } from 'mobx-react';
import { Row, Col, Tooltip, Input, Table, Icon, Popconfirm, Button,message } from 'antd';
import { breadcrumb as BreadcrumbView } from '../../commons/index';
import RoleForm from './roleForm';

import '../role.less';

const Search = Input.Search;



@inject('rootStore')
@observer
class RoleList extends Component {
    constructor(props) {
        super(props);

        // 实例属性
        this.roleStore = props.rootStore.roleStore;

        // 方法绑定
        this.createItem = this.createItem.bind(this);
        this.formCancel = this.formCancel.bind(this);
        this.formRef = this.formRef.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.editItem = this.editItem.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleMulDel = this.handleDel.bind(this);

    }
    /*打开表单，并且设置为新建*/
    createItem(){
        this.roleStore.toggleVisible(false);
        this.roleStore.toggleIsUpdate(true);
    }
    /*打开表单，并且设置为更新，绑定表单*/
    editItem(key){
        this.roleStore.toggleVisible(false);
        this.roleStore.toggleIsUpdate(false);

        this.roleStore.getDetail(this.userToken.token,key);
        this.id = key;
        let that = this;
        setTimeout(function() {
            if(that.roleStore.msg !== undefined){
                message.error(that.roleStore.msg); //失败信息
            }
            else {
                // 绑定表单
                const form = that.form;
                that.oldName = that.roleStore.role.name;
                that.oldAlias = that.roleStore.role.alias;
                form.setFieldsValue({
                    key: key,
                    name: that.roleStore.role.name,
                    alias: that.roleStore.role.alias,
                    desc: that.roleStore.role.desc
                });
            }
        }, 200);
    }
    /*关闭表单*/
    formCancel(){
        this.roleStore.toggleVisible(true);
    }
    /*接受表单页面回传过来的form对象，并且添加一个 form 的实例属性*/
    formRef = (form) => {
        this.form = form;
    };
    /*提交表单，用于处理新建逻辑*/
    handleCreate(e){
        e.preventDefault();
        const form = this.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.roleStore.saveRole(this.userToken.token,values);

                let that = this;
                setTimeout(function() {
                    if(that.roleStore.msg !== undefined){
                        message.error(that.roleStore.msg); //失败信息
                    }
                    else {
                        // 刷新Table
                        that.roleStore.getRoles(that.userToken.token);
                    }
                }, 200);
            }
        });
    };
    /* 提交表单，用于处理更新逻辑 */
    handleUpdate(e){
        e.preventDefault();
        const form = this.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // 比对绑定表单和修改后的表单
                if(this.oldName !== values.name){
                    values.checkName = true;
                }
                else {
                    values.checkName = false;
                }
                if(this.oldAlias !== values.alias){
                    values.checkAlias = true;
                }
                else {
                    values.checkAlias = false;
                }
                values.id = this.id;
                // 提交表单
                console.log(values);
                this.roleStore.updateRole(this.userToken.token,values);
                let that = this;
                setTimeout(function() {
                    if(that.roleStore.msg !== undefined){
                        message.error(that.roleStore.msg); //失败信息
                    }
                    else {
                        // 刷新Table
                        that.roleStore.getRoles(that.userToken.token);
                    }
                    form.resetFields();
                }, 200);
            }
        });
    }
    handleMulDel(e){
        message.info('暂未开放');
    }
    /*模糊查询*/
    handleSearch(value){
        if(value.trim().length >0){
            this.roleStore.searchRoles(this.userToken.token,value.trim());
        }
    }
    /*重置Table*/
    handleReset(e){
        this.roleStore.getRoles(this.userToken.token);
    }
    handleDel(key){
        message.info('暂未开放');
    }
    btnSearch_Click(){

    }

    componentWillMount(){
        const userToken = JSON.parse(localStorage.getItem('token'));
        if(userToken == null){
            alert('token过期，需要重新登陆');
        }
        else {
            this.userToken = userToken;
        }
    }

    componentDidMount(){
        // 请求数据
        this.roleStore.getRoles(this.userToken.token);
    }

    render() {
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

        const {visible,isUpdate} = this.roleStore;

        const columns = [{
            title: '角色名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '别名(授权标识)',
            dataIndex: 'alias',
            key: 'alias',
        }, {
            title: '职责描述',
            dataIndex: 'desc',
            key: 'desc',
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
                <BreadcrumbView paths={['首页', '角色管理']} />
                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={24}>
                            <Search
                                placeholder="请输入关键字查询角色"
                                prefix={<Icon type="user" />}
                                onSearch={this.handleSearch}
                            />
                        </Col>
                    </Row>
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
                        <div className='btnOpera'>
                            <Button type="primary" onClick={this.btnSearch_Click} style={{ marginRight: '10px' }}>查询</Button>
                            <Button type="primary" onClick={this.handleReset} style={{ background: '#f8f8f8', color: '#108ee9' }}>重置</Button>
                        </div>
                    </Row>
                    <Table
                        bordered={true}
                        scroll={{x:'100%'}}
                        rowSelection={rowSelection}
                        loading={this.roleStore.loading}
                        dataSource={this.roleStore.roles.slice()}
                        className='formTable'
                        rowKey="id"
                        columns={columns}
                    />
                    {
                        isUpdate ?
                        <RoleForm ref={this.formRef} visible={visible} onCancel={this.formCancel} onCreate={this.handleUpdate} title="修改角色信息" okText="更新"
                        />
                        : <RoleForm ref={this.formRef} visible={visible} onCancel={this.formCancel} onCreate={this.handleCreate} title="添加角色信息" okText="创建"
                        />
                    }
                </div>`
            </div>
        )
    }
}

export default RoleList;