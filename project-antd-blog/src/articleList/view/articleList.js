/**
 * Created by startcaft on 2018/5/1.
 */

import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import {
    List,
    Icon,
    Tag,
    Row,
    Col
} from 'antd';
import '../../assets/css/articles.css';
import {timetrans, color} from '../../utils/utils';
import {rightSider as RightSider} from '../../sider/index';



@inject('rootStore')
@observer
class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.articleStore = props.rootStore.articleStore;
    }

    componentDidMount() {
        const dicItemId = this.props.match.params.dicItemId
            ? parseInt(this.props.match.params.dicItemId, 10)
            : 0;
        const pageIndex = this.articleStore.pageIndex;
        const pageSize = this.articleStore.pageSize;

        this.articleStore.fetchArticles(pageIndex,pageSize,dicItemId);
    }

    render() {

        const {articles,pageIndex,total,loading,pageSize} = this.articleStore;

        const pagination = {
            pageSize: pageSize,
            current: pageIndex,
            total: total,
            size: 'small',
            onChange: ((page, pageSize) => {
                const currentDicItemId = this.props.match.params.dicItemId
                    ? parseInt(this.props.match.params.dicItemId, 10)
                    : 0;
                const currentPageIndex = page;
                const currentPageSize = pageSize;

                this.articleStore.changePage(currentPageIndex,currentPageSize);

                this.articleStore.fetchArticles(currentPageIndex,currentPageSize,currentDicItemId);
            })
        }

        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
              </span>
        );

        return (
            <div>
                <Row>
                    <Col
                        lg={{span: 15, offset: 1}}
                        md={{span: 15, offset: 1}}
                        xs={{span: 24}}
                        className="list-wrapper"
                    >
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={pagination}
                            loading={loading}
                            dataSource={articles}
                            renderItem={item => {
                                return (
                                    <List.Item
                                        key={item.id}
                                        actions={
                                            [
                                                <IconText type="message" text={0}/>,
                                                <IconText type="folder" text={
                                                    <Tag
                                                        color="orange"
                                                        key={item.dicItemId}
                                                        onClick={() => this.props.history.push(`/index/${item.dicItemId}`)}
                                                    >
                                                        {item.dicItemName}
                                                    </Tag>
                                                }/>
                                            ]
                                        }
                                        extra={
                                            timetrans(item.createTime)
                                        }
                                    >
                                        <List.Item.Meta
                                            className="list-item"
                                            title={item.articleTitle}
                                            description={item.articleDesc}
                                            onClick={() => this.props.history.push(`/detail/${item.id}`)}
                                        />
                                    </List.Item>
                                )
                            }}
                        >
                        </List>
                    </Col>
                    <Col
                        lg={{span: 6, offset: 1}}
                        md={{span: 6, offset: 1}}
                        xs={{span: 0}}
                    >
                        <RightSider />
                    </Col>
                </Row>
                <Row style={{marginTop: 20}}>
                    <Col
                        lg={{span: 0}}
                        md={{span: 0}}
                        xs={{span: 24}}
                    >
                        <RightSider />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ArticleList;

