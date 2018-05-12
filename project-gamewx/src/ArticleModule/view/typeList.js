/**
 * Created by Administrator on 2018/4/25.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';


// class ListStore {
//     @observable list = [
//         'Hello World!',
//         'Hello React Native!',
//         'Hello MobX!'
//     ];
//
//     ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//
//     @computed get dataSource() {
//         return this.ds.cloneWithRows(this.list.slice());
//     }
// }
//
// const listStore = new ListStore();
//
// @observer class TypeList extends React.Component {
//     render() {
//         return (
//             <ListView
//                 dataSource={listStore.dataSource}
//                 renderRow={row => <div>{row}</div>}
//                 renderBodyComponent={() => <MyBody />}
//             />
//         );
//     }
// }

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

const NUM_ROWS = 20;
let pageIndex = 0;
function genData(pIndex = pageIndex,pSize = NUM_ROWS) {
    const dataBlob = {};
    for (let i = 0; i < pSize; i++) {
        // 根据pageIndex和pageSize确定行号
        const ii = (pIndex * pSize) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

/**
 * 针对某一类型文章的列表
 */
class TypeList extends React.Component{
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4   // ListView 初始高度，随便给即可
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        // 获取 ListView 组件的DOM节点的父容器（也就是 applayout.css 中的 .main 容器的向上偏移量）
        const lvDom = ReactDOM.findDOMNode(this.lv);

        // main容器向上的偏移量
        const mainContainerOffSetTop = lvDom.parentNode.offsetTop;
        // main容器向下的偏移量
        const mainContaineroffSetBottom = 50;
        const hei = document.documentElement.clientHeight - mainContainerOffSetTop - 50;

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
                height: hei
            });
        }, 600);
    }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false

        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }

    render(){
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={5}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default TypeList;
