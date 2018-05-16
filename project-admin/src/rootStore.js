/**
 * Created by Administrator on 2018/5/15.
 */

import { loginStore as LoginStore } from './commons/index';

class RootStore {
    constructor(){
        this.loginStore = new LoginStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;