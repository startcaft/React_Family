import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import TodoView from './todoView';;

@inject('rootStore')
@observer
class TodoListView extends Component {
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
        this.todoListStore = props.rootStore.todoListStore;
    }
  
    onClick(){
        const result = this.todoListStore.addTodo(this.input.value);
        if(result){
            this.input.value = '';
        }
    }
    render(){
        return (
            <div>
                <h2>添加任务</h2>
                <input type="text" ref={(input)=>this.input=input} />
                <button type="button" onClick={ this.onClick }>添加</button>
                <h2>未完成任务</h2>
                <ol>
                    {
                        this.todoListStore.unFinishedList.slice(0).map((todo,index) => {
                            return (
                                <TodoView todo={todo} key={todo.id} />
                            )
                        })
                    }
                </ol>
                <hr/>
                Tasks left: {this.todoListStore.unFinishedList.length}
                {/* <h2>已完成任务</h2>
                <ol>
                    {todoStore.FinishedList.map((todo) =>
                        <FinishedView todo={todo} key={todo.id} />
                    )}
                </ol> */}
            </div>
        )
    }
}

export default TodoListView;