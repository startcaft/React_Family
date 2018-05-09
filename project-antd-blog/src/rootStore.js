import {tagStore as TagStore} from './sider/index';
import {loginStore as LoginStore} from './header/index';
import {articleStore as ArcileStore} from './articleList/index';


class RootStore {
    constructor(){
        this.tagStore = new TagStore(this);
        this.loginStore = new LoginStore(this);
        this.articleStore = new ArcileStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;