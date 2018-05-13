import React, {Component} from 'react';

import {NavBar, TabBar} from 'antd-mobile';
import './asserts/css/applayout.css'
import {Router, Route} from 'react-router-dom';
import history from './Common/history';
import {typeList as TypeListView,simpleListView as SimpleListView,
    articleDetail as DetailView} from './ArticleModule/index';


class AppLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: '/'
        };

        this.getTitle = this.getTitle.bind(this);
    }

    onPress(path) {
        history.push(path);
        this.setState({
            path: path
        })
    }

    getTitle() {
        switch (this.state.path) {
            case '/':
                return '全部文章列表';
            case '/strategy':
                return '游戏攻略';
            case '/method':
                return '战术打法';
        }
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <div className="header">
                        <NavBar mode="light">
                            {
                                this.getTitle()
                            }
                        </NavBar>
                    </div>
                    <div className="main">
                        <Route exact path="/" component={TypeListView} />
                        <Route path="/strategy" component={SimpleListView} />
                        <Route path="/method" component={SimpleListView} />
                        <Route path="/detail/:id" component={DetailView} />
                    </div>
                    <div className="footer">
                        <TabBar
                            unselectedTintColor='#949494'
                            tintColor='#33A3F4'
                            barTintColor='white'
                        >
                            <TabBar.Item
                                title="游戏攻略"
                                key="strategy"
                                icon={
                                    <i className="iconfont icon-gonglve" style={{fontSize: '22px'}}></i>
                                }
                                selectedIcon={
                                    <i className="iconfont icon-gonglve"
                                       style={{fontSize: '22px', color: '#33A3F4'}}></i>
                                }
                                selected={this.state.path === '/strategy'}
                                onPress={() => this.onPress('/strategy')}
                            >
                            </TabBar.Item>
                            <TabBar.Item
                                title="战术打法"
                                key="method"
                                icon={
                                    <i className="iconfont icon-gonglve" style={{fontSize: '22px'}}></i>
                                }
                                selectedIcon={
                                    <i className="iconfont icon-gonglve"
                                       style={{fontSize: '22px', color: '#33A3F4'}}></i>
                                }
                                selected={this.state.path === '/method'}
                                onPress={() => this.onPress('/method')}
                            >
                            </TabBar.Item>
                        </TabBar>
                    </div>
                </div>
            </Router>
        )
    }
}

export default AppLayout;
