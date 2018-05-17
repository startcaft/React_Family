/**
 * Created by Administrator on 2018/5/17.
 */


import React, { Component } from 'react';
import { Layout, Icon, Menu, Badge } from 'antd';
import { Link,withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { inject,observer } from 'mobx-react';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;


@inject('rootStore')
@observer
class HeaderView extends Component{
    constructor(props){
        super(props);

        this.commonStore = props.rootStore.commonStore;

        this.logout = this.logout.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.commonStore.toggle();
    }

    logout(){
        localStorage.removeItem("token");
        this.props.history.push('/login');
    }
    render(){
        return(
            <Header style={{ background: '#fff', padding: 0 }} className="header">
                <Icon
                    className="trigger"
                    type={!this.commonStore.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="schedule">
                        <Link to="/main/calendars">
                            <Badge count={3} overflowCount={99} style={{height:'15px',lineHeight:'15px'}}>
                                <Icon type="schedule" style={{fontSize:16, color: '#1DA57A' }}/>
                            </Badge>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        title={<span>
                            <Icon type="user" style={{fontSize:16, color: '#1DA57A' }}/>{this.props.username}
                        </span>}
                    >
                        <Menu.Item key="logout" style={{textAlign:'center'}} className="logout">
                            <span onClick={this.logout}>logout</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

HeaderView.propTypes = {
    username:PropTypes.string.isRequired
}

export default withRouter(HeaderView);