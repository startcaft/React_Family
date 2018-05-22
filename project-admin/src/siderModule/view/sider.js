/**
 * Created by Administrator on 2018/5/16.
 */

import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { observer,inject } from 'mobx-react';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


@inject('rootStore')
@observer
export default class SiderView extends Component{
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

    componentWillMount(){
        const userToken = JSON.parse(localStorage.getItem('token'));
        if(userToken == null){
            alert('token过期，需要重新登陆');
        }
        else {
            this.userToken = userToken;
        }
    }

    componentDidMount() {
        console.log(this.userToken.token);
        this.siderStore.fetchUserMenus(this.userToken.username,this.userToken.token);
    }
    // setMenuOpen = props => {
    //     const {path} = props;
    //     this.setState({
    //         openKey: path.substr(0, path.lastIndexOf('/')),
    //         selectedKey: path
    //     });
    // };
    // onCollapse = (collapsed) => {
    //     this.setState({
    //         collapsed,
    //         // firstHide: collapsed,
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