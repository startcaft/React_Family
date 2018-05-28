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
import { index as IndexView,roleList as RoleList } from '../roleMgr/index';
import { dicList as DicList } from '../dicMgr/index';


const {Content, Footer} = Layout;


class Main extends Component {

    handleClick(){
        localStorage.removeItem("token");
    }

    render(){
        let name;
        if (localStorage.getItem("token") === null) {
            return <Redirect to="/login"/>
        } else {
            name = JSON.parse(localStorage.getItem("token")).username;
        }

        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderView />
                <Layout>
                    <HeaderView username={name}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                        <Route exact path={'/main'} component={IndexView} />
                        <Route path={'/main/admin/role/list'} component={RoleList} />
                        <Route path={'/main/admin/dic/list'} component={DicList} />
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