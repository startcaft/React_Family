import { observable, computed, action } from 'mobx';
import Todo from './todo';

/**
 * TodoStore
 */
export default class TodoListStore {

    @observable todos = [
        new Todo("Get Coffee"),
        new Todo("Write simpler code")
    ];

    @computed get unFinishedList(){
        return this.rootStore.todoListStore.todos.filter((todo) => !todo.finished);
    }
    
    @computed get FinishedList(){
        return this.rootStore.todoListStore.todos.filter((todo) => todo.finished);
    }

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @action
    addTodo(content){
        if(content){
            this.rootStore.todoListStore.todos.push(new Todo(content));
            return true;
        }
        return false;
    }
}

