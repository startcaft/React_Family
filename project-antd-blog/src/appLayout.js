/**
 * Created by startcaft on 2018/4/29.
 */

import React, { Component } from 'react';
import {
    Layout
} from 'antd';
import './assets/css/layout.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {blogHeader as BlogHeader} from './header/index';
import {about as AboutView} from './about/index';
import {articleList as ArticleList,detail as DetailView} from './articleList/index';


class AppLayout extends Component {
    render(){
        const { Content, Footer } = Layout;
        // 中间正文内容，减去 header和footer的高度
        const contentHeight = document.body.clientHeight - 64 -69;
        return(
            <Router>
                <Layout className="wrapper">
                    <BlogHeader/>
                    <Layout className="wrapper-container">
                        <Layout className="wrapper-content">
                            <Content
                                style={{ padding: 24, margin: 0, minHeight: contentHeight, height: '100%', overflow: 'initial'}}
                            >
                                <Switch>
                                    <Route exact path="/" render={() => <Redirect to="/index/0" push />} />
                                    <Route exact path="/index" render={() => <Redirect to="/index/0" push />} />
                                    <Route path="/index/:dicItemId" component={ArticleList} />
                                    
                                    <Route path="/detail/:id" component={DetailView} />
                                    <Route path="/about" component={AboutView} />
                                </Switch>
                            </Content>
                        </Layout>
                        <Footer
                            style={{textAlign: 'center'}}
                        >
                            鄂ICP备18009664号&nbsp;&nbsp;Copyright © startcaft 2018
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}


export default AppLayout;