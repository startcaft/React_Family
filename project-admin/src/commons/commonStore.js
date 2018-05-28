/**
 * Created by Administrator on 2018/5/17.
 */

import { observable,action } from 'mobx';
import { fetchDataGet } from '../utils/fetchApi';

class CommonStore {

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @observable collapsed = false;
    loginResult = false;
    @observable msg = undefined;

    @action
    toggle(){
        this.rootStore.commonStore.collapsed = !this.rootStore.commonStore.collapsed;
    }

    @action
    checkUserToken(token){
        const startCb = () => {
        }
        const successCb = (res) => {
            if(res.code === 200){
                this.rootStore.commonStore.msg = undefined;
                this.rootStore.commonStore.loginResult = true;
            }
            else {
                this.rootStore.commonStore.msg = res.data.msg;
                this.rootStore.commonStore.loginResult = false;
            }
        }
        const failCb = (error) => {
            console.log(error);
        }
        fetchDataGet(null, `http://119.23.56.247:8223/core/users/check?token=${token}`, startCb,successCb, failCb);
    }
}

export default CommonStore;