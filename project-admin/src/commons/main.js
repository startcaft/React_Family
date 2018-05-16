/**
 * Created by Administrator on 2018/5/16.
 */

import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../assets/index.less';

import NoMatch from './noMatch';
import { siderView as SiderView } from '../siderModule/index';

const {Content, Footer} = Layout;


class Main extends Component {

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("siderCollapsed") === null) {
            localStorage.setItem("siderCollapsed", false);
        }
    }

    handleClick(){
        localStorage.removeItem("token");
    }

    render(){
        let name;
        let token;
        if (localStorage.getItem("token") === null) {
            return <Redirect to="/login"/>
        } else {
            name = JSON.parse(localStorage.getItem("token")).username;
            token = JSON.parse(localStorage.getItem("token")).token;
        }

        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderView />
                <Layout>
                    {/*<HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>*/}
                    <Content style={{margin: '0 16px'}}>
                        {/*<Switch>*/}
                            {/*<Route exact path={'/app'} component={MIndex} />*/}
                            {/*<Route exact path={'/app/form'} component={UForm} />*/}
                            {/*<Route exact path={'/app/header/Calendars'} component={Calendars} />*/}
                            {/*<Route exact path={'/app/chart/echarts'} component={Echarts} />*/}
                            {/*<Route component={noMatch} />*/}
                        {/*</Switch>*/}
                        <div>{name}</div>
                        <div>{token}</div>
                        <div>
                            <button onClick={this.handleClick}>注销</button>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        STARTCAFT ©2017-2018 Created by startcaft
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Main;