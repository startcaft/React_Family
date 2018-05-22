
import React, { Component } from 'react';
import { observer,inject } from 'mobx-react';
import { Row, Col, Tooltip, Cascader, Input, Table, Icon, Popconfirm, Button,DatePicker,message } from 'antd';
import { breadcrumb as BreadcrumbView } from '../../commons/index';
import { getRoleCols } from '../../utils/tableUtil';
import RoleForm from './roleForm';

import '../role.less';

const Search = Input.Search;
const InputGroup = Input.Group;
const options = [];
const { RangePicker } = DatePicker;



@inject('rootStore')
@observer
class RoleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: ''
        };

        this.roleStore = props.rootStore.roleStore;

        this.createItem = this.createItem.bind(this);
        this.formCancel = this.formCancel.bind(this);
        this.formRef = this.formRef.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    /*打开表单，并且设置为新建*/
    createItem(){
        this.roleStore.toggleVisible(false);
        this.roleStore.toggleIsUpdate(true);
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
                }, 200);
            }
        });
    };
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

        return (
            <div>
                <BreadcrumbView paths={['首页', '角色管理']} />
                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={8}>
                            <Search
                                placeholder="请输入关键字查询角色"
                                prefix={<Icon type="user" />}
                                onSearch={this.handleSearch}
                            />
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            {/*<InputGroup compact>*/}
                                {/*<Cascader style={{ width: '100%' }} options={options} placeholder="Select Address" onChange={this.Cascader_Select} value={'address'} />*/}
                            {/*</InputGroup>*/}
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            {/*<RangePicker style={{ width: '100%' }} onChange={this.RangePicker_Select}  />*/}
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <div className='plus' onClick={this.createItem}>
                            <Icon type="plus-circle" />
                        </div>
                        <div className='minus'>
                            <Popconfirm title="确定要批量删除吗?" onConfirm={this.MinusClick}>
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
                        columns={getRoleCols()}
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