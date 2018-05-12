/**
 * Created by Administrator on 2018/4/26.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';
import ListItem from './listItem';
import { observable } from 'mobx';
import { observer,inject } from 'mobx-react';

// 当前请求页
let pageIndex = 1;
let pageSize = 5;

@inject('rootStore')
@observer
class SimpleListView extends React.Component {
    constructor(props){
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.height = document.documentElement.clientHeight * 3 / 4;   // ListView 初始高度，随便给即可

        this.articleStore = props.rootStore.articleStore;
        this.pageSize = 5; //每次渲染的个数
        this.pageIndex = 1; //当前页数


        this._getListViewBody = this._getListViewBody.bind(this);
    }

    // 自定义容器 ListView，主要要计算其高度，并赋值给ListView组件
    _getListViewBody(){
        return (
            <div className="am-list-body my-body">
                {this.props.children}
            </div>
        )
    }


    componentDidMount() {
        // 请求数据
        this.articleStore.fetchArticles(this.pageIndex,this.pageSize,0);

        // 计算ListView的高度
        // 获取 ListView 组件的DOM节点的父容器（也就是 applayout.css 中的 .main 容器的向上偏移量）
        const lvDom = ReactDOM.findDOMNode(this.lv);
        // main容器向上的偏移量
        const mainContainerOffSetTop = lvDom.parentNode.offsetTop;
        // main容器向下的偏移量
        const mainContaineroffSetBottom = 50;
        const height = document.documentElement.clientHeight - mainContainerOffSetTop - mainContaineroffSetBottom;
        this.articleStore.changeHeight(height);
    }

    onEndReached = (event) => {
        // 当 loading 完成 并且没有多余数据可以加载时候，退出执行
        if(this.articleStore.isLoading == false && this.articleStore.hasMore == false){
            return;
        }
        // 否则继续加载更多数据
        this.articleStore.fetchArticles(++this.pageIndex,this.pageSize,0);
    }

    render(){
        const getRowFunc = (rowData, sectionID, rowID, highlightRow) => {
            return (
                <ListItem rowData={rowData} sectionID={sectionID} rowID={rowID} />
            )
        };

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.articleStore.dataSource}
                // renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>
                //      {this.articleStore.articles.isLoading ? 'Loading...' : 'Loaded'}
                //  </div>)}
                renderRow={getRowFunc}
                renderBodyComponent={() => this._getListViewBody()}
                style={{
                    height: this.articleStore.height,
                    overflow: 'auto',
                }}
                pageSize={4}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={20}
            />
        );
    }
}

export default SimpleListView;