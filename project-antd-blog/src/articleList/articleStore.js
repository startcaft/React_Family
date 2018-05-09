
import {observable, action,runInAction} from 'mobx';

class ArticleStore {

    @observable loading = true;
    @observable articles = [];
    @observable detail = {};
    @observable errorMsg;

    @observable pageIndex = 1;
    pageSize = 5;
    hasMore = false;
    total = 0;

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @action changePage = (pageIndex,pageSize) => {
        this.rootStore.articleStore.pageIndex = pageIndex;
        this.rootStore.articleStore.pageSize = pageSize;
    }

    @action
    fetchArticles(pageIndex = this.pageIndex,pageSize = this.pageSize,dicItemId = 0){

        let url = `http://119.23.56.247:8223/core/articles/page?page=${pageIndex}&rows=${pageSize}&dicItemId=${dicItemId}`;

        this.rootStore.articleStore.loading = true;

        fetch(url, {
            method: 'GET'
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json();
        }).then((res) => {
            // 只将状态修改的部分放入一个异步动作中
            runInAction("fetchArticlesSuccess",() => {
                this.rootStore.articleStore.articles = res.rows;
                this.rootStore.articleStore.hasMore = res.hasMore;
                this.rootStore.articleStore.total = res.total;
            })
        }).catch((error) => {
            // 只将状态修改的部分放入一个异步动作中
            runInAction("fetchArticlesFail",() => {
                this.rootStore.articleStore.errorMsg = '请求数据失败!';
            })
        })

        this.rootStore.articleStore.loading = false;
    }

    @action
    getArticleDetail(id){
    
        let url = `http://119.23.56.247:8223/core/articles/${id}`;

        this.rootStore.articleStore.loading = true;
    
        fetch(url,{
            method:'GET'
        }).then((res) => {
            if(res.status !== 200){
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json()
        }).then((res) => {
            // 只将状态修改的部分放入一个异步动作中
            runInAction("fetchDetailSuccess",() => {
                this.rootStore.articleStore.detail = res.data;
            })
        }).catch((error) => {
            // 只将状态修改的部分放入一个异步动作中
            runInAction("fetchDetailFail",() => {
                this.rootStore.articleStore.errorMsg = '请求数据失败!';
            })
        })

        this.rootStore.articleStore.loading = false;
    }
}

export default ArticleStore;