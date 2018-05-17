/**
 * Created by Administrator on 2018/5/16.
 */

import { observable,action, runInAction } from 'mobx';

class SiderStore {

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @observable loading = false;
    @observable msg;
    @observable menus = [];

    @action
    fetchUserMenus(username,token){

        this.rootStore.siderStore.loading = true;

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization',token);

        fetch(`http://119.23.56.247:8223/core/resources/menus/${username}`, {
            method: 'get',
            headers: myHeaders
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json()
        }).then((res) => {
            runInAction('fetchUserMenusSuccess',() => {
                if(res.reqSuccess){
                    this.rootStore.siderStore.menus = res.data;
                    this.rootStore.siderStore.msg = undefined;
                }
                else {
                    this.rootStore.siderStore.msg = res.msg;
                }
                this.rootStore.siderStore.loading = false;
            })
        }).catch((error) => {
            runInAction('fetchUserMenusFail',() => {
                console.log(error);
                this.rootStore.siderStore.msg = '登陆失败';
                this.rootStore.siderStore.loading = false;
            })
        });
    }
}

export default SiderStore;