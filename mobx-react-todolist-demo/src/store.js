import { observable, computed } from 'mobx';

class Todo {
    id = Math.random();
    @observable content;
    @observable finished = false;

    constructor(content){
        this.content = content;
    }

    finish(){
        this.finished = true;
    }
}

class TodoList {
    @observable todos = [];
    @computed get unFinishedList(){
        return this.todos.filter(todo => !todo.finished);
    }
    @computed get FinishedList(){
        return this.todos.filter(todo => todo.finished);
    }

    addTodo(content){
        if(content){
            this.todos.push(new Todo(content));
        }
    }
}


const store = new TodoList();

store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
);

export default store;