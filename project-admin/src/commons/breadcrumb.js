/**
 * Created by Administrator on 2018/5/17.
 */

import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'

    export default class BreadcrumbView extends Component{
    Breadcrumbs(){
        const { paths } = this.props;
        let v = paths.map(function(item,index){
            return (
                <Breadcrumb.Item key="item">
                    {item==="首页"?<Link to={"/main"}>{item}</Link>:item}
                </Breadcrumb.Item>
            )
        });
        return v;
    }

    render(){
        return(
            <Breadcrumb style={{ margin: '12px 0' }}>
                {this.Breadcrumbs()}
            </Breadcrumb>
        )
    }
}