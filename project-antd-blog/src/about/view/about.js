/**
 * Created by startcaft on 2018/4/30.
 */

import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    Icon
} from 'antd';
import '../../assets/css/about.css';
import {rightSider as SiderView} from '../../sider/index';

class About extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col
                        lg={{ span: 15, offset: 1 }}
                        md={{ span: 15, offset: 1 }}
                        xs={{ span: 24 }}
                        className="about-wrapper"
                    >
                        <Card
                            title="关于我"
                            style={{marginBottom: 20}}
                        >
                            <div className="content">
                                <p>
                                    嘿！你好，我是博客的博主！该博客主要是用来记录我的一些技术点滴，
                                    和一些其他方面的随笔，感悟，生活等。
                                </p>
                                <p style={{marginTop: 20}}>
                                    作为一个前端打杂人员，一直想要弄一个自己的博客，在刚学前端不久的时候，
                                    就想自己动手写一个，也算是对自己编码能力的一种试验吧，于是有了这个网站。
                                </p>
                            </div>
                        </Card>
                        <Card
                            title="联系我"
                        >
                            <div className="content">
                                <p>
                                    <Icon type="mail" /> 邮箱：51418996@qq.com
                                </p>
                                <p style={{marginTop: 20}}>
                                    <Icon type="github" /> Github：<a href="https://github.com/startcaft" target="_blank" rel="noopener noreferrer">startcaft</a>
                                </p>
                            </div>
                        </Card>
                    </Col>
                    {/*web端显示*/}
                    <Col
                        lg={{ span: 6, offset: 1 }}
                        md={{ span: 6, offset: 1 }}
                        xs={{ span: 0 }}
                    >
                        <SiderView/>
                    </Col>
                </Row>
                {/*移动端显示*/}
                <Row style={{marginTop: 20}}>
                    <Col
                        lg={{ span: 0 }}
                        md={{ span: 0 }}
                        xs={{ span: 24 }}
                    >
                        <SiderView/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default About