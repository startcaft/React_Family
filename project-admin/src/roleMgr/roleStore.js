/**
 * roleStore
 */

import { observable, action } from 'mobx';
import { fetchDataGet } from '../utils/fetchApi';


class RoleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable loading = false;
    @observable roles = [];
    @observable msg;


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
}

export default RoleStore;