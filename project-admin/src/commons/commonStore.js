/**
 * Created by Administrator on 2018/5/17.
 */

import { observable,action } from 'mobx';

class CommonStore {

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @observable collapsed = false;

    @action
    toggle(){
        this.rootStore.commonStore.collapsed = !this.rootStore.commonStore.collapsed;
        console.log(this.rootStore.commonStore.collapsed);
    }
}

export default CommonStore;