/**
 * Created by startcaft on 2018/5/12.
 */

import {articleStore as ArticleStore} from './ArticleModule/index';

class RootStore {
    constructor(articleStore){
        this.articleStore = new ArticleStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;