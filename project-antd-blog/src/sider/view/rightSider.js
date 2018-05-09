/**
 * Created by startcaft on 2018/4/30.
 */

import React, { Component } from 'react';
import {
    Card,
    Tag,
    Spin, Alert
} from 'antd';
import { withRouter } from 'react-router-dom';
import { observer,inject } from 'mobx-react';
import { color } from '../../utils/utils';
import '../../assets/css/sider.css';


@inject('rootStore')
@observer
class RightSider extends Component {
    constructor(props){
        super(props);

        this.tagStore = props.rootStore.tagStore;
    }

    componentDidMount(){
        this.tagStore.fetchTags();
        this.tagStore.fetchNewArticles();
    }

    pushTag(dicItemId){
        this.props.history.push(`/index/${dicItemId}`);
    }

    pushDetail(articleId){
        this.props.history.push(`/detail/${articleId}`)
    }

    render(){
        const { tags,loading,errorMsg,newArticles } = this.tagStore;
        return (
            <div className="sider-container">
                <div className="admin-info">
                    <header>
                        <img src="http://img4.imgtn.bdimg.com/it/u=1162125490,2737259076&fm=27&gp=0.jpg" alt="avatar"/>
                    </header>
                    <p className="admin-name">
                        startcaft
                    </p>
                    <p className="admin-desc">
                        后端程序狗，前端爱好者
                    </p>
                </div>
                <div className="recent-article">
                    <Card title="最新文章" bordered={false}>
                        {
                            loading ?
                                <Spin spinning={loading}>
                                    <Alert
                                        message="加载数据"
                                        description="正在为您加载数据,请稍后."
                                        type="info"
                                    />
                                </Spin> :
                                (
                                    errorMsg
                                        ?
                                        <span style={{color:'red',fontWeight:700}}>{errorMsg}</span>
                                        :
                                        <ul className="recent-list">
                                            {
                                                newArticles.map((item) => {
                                                    return (
                                                        <li key={item.id} onClick={() => this.pushDetail(item.id)}>
                                                            {item.articleTitle}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>

                                )
                        }
                    </Card>
                </div>
                <div className="tags-wrapper">
                    <Card title="标签" bordered={false}>
                        <div className="tags-content">
                            {
                                loading ?
                                    <Spin spinning={loading}>
                                        <Alert
                                            message="加载数据"
                                            description="正在为您加载数据,请稍后."
                                            type="info"
                                        />
                                    </Spin> :
                                    (
                                        errorMsg ?
                                            <span style={{color:'red',fontWeight:700}}>{errorMsg}</span>:
                                            tags.map((tag) => {
                                                return (
                                                    <Tag key={tag.id} color={color[Math.floor(Math.random()*color.length)]} onClick={() => this.pushTag(tag.id)}>
                                                        {tag.name}
                                                    </Tag>
                                                )
                                            })
                                    )
                            }
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}


export default withRouter(RightSider);