/**
 * Created by Administrator on 2018/5/15.
 */

import { loginStore as LoginStore } from './login/index';
import { siderStore as SiderStore } from './siderModule/index';
import { commonStore as CommonStore } from './commons/index';
import { roleStore as RoleStore } from './roleMgr/index';

class RootStore {
    constructor(){
        this.loginStore = new LoginStore(this);
        this.siderStore = new SiderStore(this);
        this.commonStore = new CommonStore(this);
        this.roleStore = new RoleStore(this);
    }
}

const rootStore = new RootStore();

console.log(rootStore);

export default rootStore;