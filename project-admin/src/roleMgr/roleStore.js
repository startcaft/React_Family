/**
 * roleStore
 */

import { observable, action } from 'mobx';
import { fetchDataGet,postData } from '../utils/fetchApi';


class RoleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable loading = false;
    // 窗口默认隐藏
    @observable visible = false;
    // 是否更新
    @observable isUpdate = false;
    @observable roles = [];
    @observable msg;

    @action
    toggleVisible(val){
        this.rootStore.roleStore.visible = !val;
    }

    @action
    toggleIsUpdate(val){
        this.rootStore.roleStore.isUpdate = !val;
    }


    @action
    getRoles(token) {
        const startCb = () => {
            this.rootStore.roleStore.loading = true;
        }
        const successCb = (res) => {
            this.rootStore.roleStore.roles = res.rows;
            this.rootStore.roleStore.loading = false;
        }
        const failCb = (error) => {
            console.log(error);
            this.rootStore.roleStore.msg = '获取数据失败';
            this.rootStore.roleStore.loading = false;
        }
        fetchDataGet(token, 'http://119.23.56.247:8223/core/roles/list', startCb,successCb, failCb);
    }

    @action
    searchRoles(token,roleName) {
        const startCb = () => {
            this.rootStore.roleStore.loading = true;
        }
        const successCb = (res) => {
            this.rootStore.roleStore.roles = res.rows;
            this.rootStore.roleStore.loading = false;
        }
        const failCb = (error) => {
            console.log(error);
            this.rootStore.roleStore.msg = '获取数据失败';
            this.rootStore.roleStore.loading = false;
        }
        fetchDataGet(token, `http://119.23.56.247:8223/core/roles/list?name=${roleName}`, startCb,successCb, failCb);
    }

    @action
    saveRole(token,data) {
        const startCb = () => {
        }
        const successCb = (res) => {
            if(res.reqSuccess){
                this.rootStore.roleStore.msg = undefined;
                this.rootStore.roleStore.visible = false;
            }
            else {
                this.rootStore.roleStore.msg = res.msg;
            }
        }
        const failCb = (error) => {
            console.log(error);
        }

        postData(token,data, 'http://119.23.56.247:8223/core/roles/save', startCb,successCb, failCb);
    }
}

export default RoleStore;