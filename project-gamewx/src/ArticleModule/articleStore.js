/**
 * Created by startcaft on 2018/5/12.
 */

import { observable,action,runInAction,computed } from 'mobx';
import { ListView } from 'antd-mobile';


class ArticleStore {
    @observable height = document.documentElement.clientHeight * 3 / 4;   // ListView 初始高度，随便给即可
    @observable articles = [];
    @observable hasMore = false;
    @observable isLoading = false;
    @observable error = null;
    @observable detail = {};

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    constructor(root){
        this.root = root;
    }

    @computed get dataSource(){
        return this.root.articleStore.ds.cloneWithRows(this.root.articleStore.articles.slice());
    }

    @action changeHeight = (newHeight) => {
        this.root.articleStore.height = newHeight;
    }

    @action
    fetchArticles(pageIndex = 1,pageSize = 5,dicItemId = 0){

        this.root.articleStore.isLoading = true;

        let url = `http://119.23.56.247:8223/core/articles/page?page=${pageIndex}&rows=${pageSize}&dicItemId=${dicItemId}`;

        fetch(url,{
            method:'GET'
        }).then((res) => {
            if(res.status !== 200){
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json()
        }).then((res) => {
            runInAction('fetchArticlesSuccess',() => {
                // this.root.articleStore.articles.push(res.rows);
                res.rows.forEach((item) => {
                    this.root.articleStore.articles.push({
                        id:item.id,
                        articleTitle:item.articleTitle,
                        articleContent:item.articleContent,
                        articleDesc:item.articleDesc,

                    })
                })
                this.root.articleStore.hasMore = res.hasMore;
                this.root.articleStore.isLoading = false;
            })
        }).catch((error) => {
            runInAction('fetchArticlesFail',() => {
                this.root.articleStore.error = '请求失败!';
                this.root.articleStore.hasMore = false;
                this.root.articleStore.isLoading = false;
            })
        })
    }

    @action
    getArticleDetail(id){

        let url = `http://119.23.56.247:8223/core/articles/${id}`;

        this.root.articleStore.isLoading = true;

        fetch(url,{
            method:'GET'
        }).then((res) => {
            if(res.status !== 200){
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json()
        }).then((res) => {
            runInAction("fetchDetailSuccess",() => {
                this.root.articleStore.detail = res.data;
                this.root.articleStore.isLoading = false;
            })
        }).catch((error) => {
            runInAction("fetchDetailFail",() => {
                this.root.articleStore.error = '请求数据失败!';
                this.root.articleStore.isLoading = false;
            })
        })


    }
}

export default ArticleStore;