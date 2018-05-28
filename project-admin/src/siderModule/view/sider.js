/**
 * Created by Administrator on 2018/5/16.
 */

import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { observer,inject } from 'mobx-react';
import { withRouter } from "react-router-dom";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


@inject('rootStore')
@observer
class SiderView extends Component{
    constructor(props){
        super(props);

        this.siderStore = props.rootStore.siderStore;
        this.commonStore = props.rootStore.commonStore;
    }

    menuClick = e => {
        // this.setState({
        //     selectedKey: e.key
        // });
        console.log(e.key);
    };

    componentDidMount() {
        const userToken = JSON.parse(localStorage.getItem('token'));
        // 检查当前用户token
        this.commonStore.checkUserToken(userToken.token);

        // token有效则进行业务逻辑，否则就清空本地token，然后跳转到/login路由页面
        const that = this;
        setTimeout(() => {
            if(that.commonStore.loginResult){
                that.siderStore.fetchUserMenus(userToken.username,userToken.token);
            }
            else {
                that.props.history.push('/login');
            }
        }, 200);
    }
    // setMenuOpen = props => {
    //     const {path} = props;
    //     this.setState({
    //         openKey: path.substr(0, path.lastIndexOf('/')),
    //         selectedKey: path
    //     });
    // };
    // menuClick = e => {
    //     this.setState({
    //         selectedKey: e.key
    //     });
    // };
    // openMenu = v => {
    //     this.setState({
    //         openKey: v[v.length - 1],
    //         firstHide: false,
    //     })
    // };
    render(){
        const collapsed = this.commonStore.collapsed;

        return(
            <Sider
                trigger={null}
                collapsed={collapsed}
            >
                <div className="logo" style={collapsed ? {backgroundSize:'70%'} : {backgroundSize:'30%'}}/>
                <Menu
                    theme="dark"
                    mode="inline"
                    // selectedKeys={[selectedKey]}
                    onClick={this.menuClick}
                    // onOpenChange={this.openMenu}
                    // openKeys={firstHide ? null : [openKey]}
                >
                    {
                        this.siderStore.menus.map((currentValue) => {
                            return (
                                <SubMenu key={currentValue.id} title={<span><Icon type={!currentValue.icon ? 'appstore' : currentValue.icon} /><span>{currentValue.name}</span></span>}>
                                    {
                                        currentValue.children.map((child) => {
                                            return (
                                                <Menu.Item key={child.url}>
                                                    <Link to={`/main${child.url}`}><span>{child.name}</span></Link>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(SiderView);