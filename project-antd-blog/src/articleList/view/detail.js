/**
 * Created by Administrator on 2018/5/3.
 */

import React, {Component} from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import {observer,inject} from 'mobx-react';
import {
    timetrans,
    color
} from '../../utils/utils';
import {
    Card,
    Icon,
    Tag,
    Row,
    Col,
    BackTop
} from 'antd';
import Catalog from './catalog';

@inject('rootStore')
@observer
class Detail extends Component {
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

    render() {
        // const IconText = ({type, text}) => (
        //     <span key={text}>
        //         <Icon type={type} style={{marginRight: 8}}/>
        //         {text}
        //     </span>
        // );

        const {detail,loading} = this.articleStore;

        return (
            <Row>
                <BackTop visibilityHeight={300}/>
                <Col
                    lg={{span: 16,offset:4}}
                    md={{span: 16,offset:4}}
                    xs={{span: 24}}
                >
                    <Card
                        className="article-wrapper"
                        loading={loading}
                        title={detail.articleTitle}
                        extra={[
                            <Tag color="red" key="author">
                                作者：startcaft
                            </Tag>,
                            <span style={{marginTop: 10}} key="time">
                                {
                                    timetrans(detail.createTime)
                                }
                            </span>
                        ]}
                    >
                        <div
                            className="article-detail"
                            dangerouslySetInnerHTML={{ __html: detail.articleContent ? marked(detail.articleContent) : null }}
                        />
                    </Card>
                </Col>
                {/* <Col
                    lg={{ span: 6, offset: 1 }}
                    md={{ span: 6, offset: 1 }}
                    xs={{ span: 0 }}
                >
                    <Card  title="目录" className="catalog">
                        {
                            <Catalog content={detail.articleContent}/>
                        }
                    </Card>
                </Col> */}
 
            </Row>
        )
    }
}

export default Detail;
