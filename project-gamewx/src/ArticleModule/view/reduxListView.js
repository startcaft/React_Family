/**
 * Created by Administrator on 2018/4/26.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';
import ListItem from './listItem';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions';

// 当前请求页
let pageIndex = 1;
let pageSize = 5;

class ReduxListView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            height: document.documentElement.clientHeight * 3 / 4   // ListView 初始高度，随便给即可
        }

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

    _getListViewHeight(){
        // 获取 ListView 组件的DOM节点的父容器（也就是 applayout.css 中的 .main 容器的向上偏移量）
        const lvDom = ReactDOM.findDOMNode(this.lv);
        // main容器向上的偏移量
        const mainContainerOffSetTop = lvDom.parentNode.offsetTop;
        // main容器向下的偏移量
        const mainContaineroffSetBottom = 50;
        const hei = document.documentElement.clientHeight - mainContainerOffSetTop - mainContaineroffSetBottom;

        return hei;
    }

    componentDidMount() {
        // 请求数据
        this.props.dispatch(fetchArticles(pageIndex,pageSize));
        this.setState({
            height: this._getListViewHeight(),
            isLoading:false
        });
    }

    onEndReached = (event) => {
        // 当 loading 完成 并且没有多余数据可以加载时候，退出执行
        if (this.state.isLoading && !this.props.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        console.log(event);
        // // 继续请求更多的数据
        // this.props.dispatch(fetchArticles(++pageIndex,pageSize));
        // this.setState({
        //     isLoading:false,
        // });

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
                dataSource={this.props.dataSource}
                renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={getRowFunc}
                renderBodyComponent={() => this._getListViewBody()}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={4}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

const mapStateToProps = (state) => {
    // const dataSource = new ListView.DataSource({
    //     rowHasChanged:((r1,r2) => (r1 !==r2))
    // })
    const hasMore = state.articleState.hasMore;
    const errorMsg = state.articleState.errorMsg;
    const dataSource = new ListView.DataSource({
        rowHasChanged:((r1,r2) => (r1 !==r2))
    }).cloneWithRows(state.articleState.articles);

    return {
        hasMore,
        errorMsg,
        dataSource
    }

    // return {
    //     hasMore:state.articleState.hasMore,
    //     errorMsg:state.articleState.errorMsg,
    //     dataSource:dataSource.cloneWithRows(state.articleState.articles)
    // }
}

export default connect(mapStateToProps)(ReduxListView);