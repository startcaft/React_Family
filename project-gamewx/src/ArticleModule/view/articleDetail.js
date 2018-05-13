/**
 * Created by Administrator on 2018/4/25.
 */

import React, {Component} from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import {observer,inject} from 'mobx-react';
import { Card,WingBlank, WhiteSpace,Tag } from 'antd-mobile';
import { timetrans } from '../../utils/utils';


@inject('rootStore')
@observer
class ArticleDetail extends React.Component{
    constructor(props) {
        super(props)

        this.articleStore = props.rootStore.articleStore;
    }

    componentWillMount() {
        marked.setOptions({
            highlight: code => hljs.highlightAuto(code).value
        })
    }

    componentDidMount() {
        this.articleStore.getArticleDetail(this.props.match.params.id);
    }

    render(){
        const {detail,isLoading} = this.articleStore;
        return (
            <Card full={true}>
                <Card.Header
                    title={detail.articleTitle}
                    extra={[
                        <span style={{marginTop: 10}} key="time">
                            {
                                timetrans(detail.createTime)
                            }
                        </span>
                    ]}
                />
                <Card.Body>
                    <div
                        dangerouslySetInnerHTML={{ __html: detail.articleContent ? marked(detail.articleContent) : null }}
                    />
                </Card.Body>
                <Card.Footer>

                </Card.Footer>
            </Card>

        )
    }
}

export default ArticleDetail;
