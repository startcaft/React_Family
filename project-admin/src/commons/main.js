/**
 * Created by Administrator on 2018/5/16.
 */

import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../assets/index.less';

import NoMatch from './noMatch';
import { siderView as SiderView } from '../siderModule/index';
import { header as HeaderView } from '../headerModule/index';
import { calendars as Calendars } from '../commons/index';
import { index as IndexView } from '../admin/index';


const {Content, Footer} = Layout;


class Main extends Component {

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
                    <HeaderView username={name}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                        <Route exact path={'/main'} component={IndexView} />
                        {/*<Route exact path={'/app/form'} component={UForm} />*/}
                        <Route exact path={'/main/calendars'} component={Calendars} />
                        {/*<Route exact path={'/app/chart/echarts'} component={Echarts} />*/}
                        <Route component={NoMatch} />
                    </Switch>
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