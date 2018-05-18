

import { runInAction } from 'mobx';

 /**
 * 获取指定url 的数据，
 * @param {string} token 默认为null，
 * @param {string} url 
 * @param {function} stratCallBack 开始时的回调，主要是标识网络请求开始。
 * @param {function} successCallBack 成功时的回调，接受一个 json 对象为参数
 * @param {function} failCallBack 失败时的回调，接收一个 error 对象为参数
 */
function fetchDataGet(token = null,url,stratCallBack,successCallBack,failCallBack){

    stratCallBack();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if(token != null){
        myHeaders.append('Authorization',token);
    }
    
    fetch(url, {
            method: 'get',
            headers: myHeaders
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('Fail to get response with status ' + res.status);
            }
            return res.json()
        }).then((res) => {
            runInAction(() => {
                successCallBack(res);
            })
        }).catch((error) => {
            runInAction(() => {
                failCallBack(error);
            })
        });
}



export { fetchDataGet };