
import React, { Component } from 'react';
import { observer,inject } from 'mobx-react';
import { Row, Col, Tooltip, Cascader, Input, Table, Icon, Popconfirm, Button,DatePicker } from 'antd';
import { breadcrumb as BreadcrumbView } from '../../commons/index';
import { getRoleCols } from '../../utils/tableUtil';

import '../role.less';

const Search = Input.Search;
const InputGroup = Input.Group;
const options = [];
const { RangePicker } = DatePicker;




@inject('rootStore')
@observer
class RoleIndex extends Component {
    constructor(props) {
        super(props);

        this.roleStore = props.rootStore.roleStore;
    }

    componentDidMount(){
        // 请求数据
        const userToken = JSON.parse(localStorage.getItem('token'));
        this.roleStore.getRoles(userToken.token);
    }

    render() {
        // const dataSource = [{
        //     key: '1',
        //     name: '胡彦斌',
        //     alias: 32,
        //     desc: '西湖区湖底公园1号'
        // }, {
        //     key: '2',
        //     name: '胡彦祖',
        //     alias: 42,
        //     desc: '西湖区湖底公园1号'
        // }];
        const questiontxt = () => {
            return (
                <p>
                    <Icon type="plus-circle-o" /> : 新建信息<br />
                    <Icon type="minus-circle-o" /> : 批量删除
                </p>
            )
        };
        console.log(this.roleStore.roles.slice());
        return (
            <div>
                <BreadcrumbView paths={['首页', '角色管理']} />
                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={8}>
                            <Search
                                placeholder="Input Name"
                                prefix={<Icon type="user" />}
                                value={'zhangsan'}
                                onChange={this.onChangeUserName}
                                onSearch={this.onSearchUserName}
                            />
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <InputGroup compact>
                                <Cascader style={{ width: '100%' }} options={options} placeholder="Select Address" onChange={this.Cascader_Select} value={'address'} />
                            </InputGroup>
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <RangePicker style={{ width: '100%' }} onChange={this.RangePicker_Select}  />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <div className='plus' onClick={this.CreateItem}>
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
                            <Button type="primary" onClick={this.btnClear_Click} style={{ background: '#f8f8f8', color: '#108ee9' }}>重置</Button>
                        </div>
                    </Row>
                    <Table 
                        bordered={true}
                        loading={this.roleStore.loading}
                        dataSource={this.roleStore.roles} 
                        columns={getRoleCols()} />
                </div>`
            </div>
        )
    }
}

export default RoleIndex;