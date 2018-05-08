import { observable } from 'mobx';

export default class Todo {

    id = Math.random();
    @observable content;
    @observable finished = false;

    constructor(content){
        this.content = content;
    }
}