/**
 * Created by Administrator on 2018/5/15.
 */

import { loginStore as LoginStore } from './commons/index';
import { siderStore as SiderStore } from './siderModule/index';

class RootStore {
    constructor(){
        this.loginStore = new LoginStore(this);
        this.siderStore = new SiderStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;