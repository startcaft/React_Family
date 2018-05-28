
import { observable, action } from 'mobx';
import { fetchDataGet,postData } from '../utils/fetchApi';


class DicStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable loading = false;
    // 窗口默认隐藏
    @observable visible = false;
    // 是否更新
    @observable isUpdate = false;
    @observable dics = [];
    @observable dic = {};
    @observable msg;

    @action
    setVisible(val){
        this.rootStore.dicStore.visible = val;
    }

    @action
    setIsUpdate(val){
        this.rootStore.dicStore.isUpdate = val;
    }

    @action
    getDics(token) {
        const startCb = () => {
            this.rootStore.dicStore.loading = true;
        }
        const successCb = (res) => {
            this.rootStore.dicStore.dics = res;
            this.rootStore.dicStore.loading = false;
        }
        const failCb = (error) => {
            console.log(error);
            this.rootStore.dicStore.msg = '获取数据失败';
            this.rootStore.dicStore.loading = false;
        }
        fetchDataGet(token, 'http://119.23.56.247:8223/core/dics/tree/0', startCb,successCb, failCb);
    }
}

export default DicStore;