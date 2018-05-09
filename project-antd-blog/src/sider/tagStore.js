import {observable, action,runInAction} from 'mobx';

class TagStore {

    @observable loading = true;
    @observable tags = [];
    @observable errorMsg;
    @observable newArticles = [];

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @action
    fetchTags(){
        fetch('http://119.23.56.247:8223/core/dics/tree/10', {
            method: 'GET'
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json();
        }).then((res) => {
            // 只将状态修改的部分放入一个异步动作中
            runInAction("fetchTagsSuccess",() => {
                this.rootStore.tagStore.tags = res[0].children;
            })
        }).catch((error) => {
            // 只将状态修改的部分放入一个异步动作中
            runInAction("fetchTagsFail",() => {
                this.rootStore.tagStore.errorMsg = '请求数据失败!';
            })
        })

        this.rootStore.tagStore.loading = false;
    }

    @action
    fetchNewArticles(){
        fetch('http://119.23.56.247:8223/core/articles/game/top8', {
            method: 'GET'
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json()
        }).then((res) => {
            runInAction('fetchNewArticles',() => {
                this.rootStore.tagStore.newArticles = res.data;
            })
            
        }).catch((error) => {
            runInAction('fetchNewFail',() => {
                this.rootStore.tagStore.errorMsg = '请求数据失败!';
            })
        })

        this.rootStore.tagStore.loading = false;
    }
}

export default TagStore;