/** root store */

import TodoListStore from './todos/todoListStore';

class RootStore {
    constructor(){
        this.todoListStore = new TodoListStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;