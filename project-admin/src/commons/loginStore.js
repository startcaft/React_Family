/**
 * Created by Administrator on 2018/5/15.
 */


import {observable, action,runInAction,computed} from 'mobx';

class LoginStore {

    @observable loading = false;
    @observable token = localStorage.getItem('token');
    @observable msg;

    constructor(rootStore){
        this.rootStore = rootStore;
    }


    @action loginOut = () => {
        this.rootStore.loginStore.token = null;
    }

    @computed get isLoginSuccess(){
        if(this.rootStore.loginStore.msg === undefined){
            return true;
        }
        else {
            return false;
        }
    }

    @action
    userLogin(username,password){

        this.rootStore.loginStore.loading = true;

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const myData = {loginName:username,password};
        fetch('http://119.23.56.247:8223/core/users/login', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(myData)
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json()
        }).then((res) => {
            runInAction('loginSuccess',() => {
                if(res.reqSuccess){
                    this.rootStore.loginStore.token = {username:username,token:res.data};
                    this.rootStore.loginStore.msg = undefined;
                }
                else {
                    this.rootStore.loginStore.msg = res.msg;
                }
                this.rootStore.loginStore.loading = false;
            })
        }).catch((error) => {
            runInAction('loginFail',() => {
                console.log(error);
                this.rootStore.loginStore.msg = '登陆失败';
                this.rootStore.loginStore.loading = false;
            })
        });
    }
}

export default LoginStore;