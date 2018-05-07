import { observer } from 'mobx-react';
import React, { Component } from 'react';
import TodoView from './TodoView';



@observer
class TodoListView extends Component {
    constructor(props){
        super(props);

        this.state = {
            content:''
        }

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onChange(event){
        this.setState({
            content:event.target.value
        })
    }
    onClick(){
        this.props.todolist.addTodo(this.state.content);
    }

    render(){
        const todolist = this.props.todolist;
        return (
            <div>
                <h2>添加任务</h2>
                <input type="text" value={ this.state.content } onChange={ this.onChange }/>
                <button type="button" onClick={ this.onClick }>添加</button>
                <h2>未完成任务</h2>
                <ol>
                    {
                        todolist.unFinishedList.slice(0).map((todo,index) => {
                            return (
                                <TodoView todo={todo} key={todo.id} />
                            )
                        })
                    }
                </ol>
                <hr/>
                Tasks left: {todolist.unFinishedList.length}
                <h2>已完成任务</h2>
                <ol>
                    {todolist.FinishedList.map((todo) =>
                        <FinishedView todo={todo} key={todo.id} />
                    )}
                </ol>
            </div>
        )
    }
}

@observer
class FinishedView extends Component{
	render() {
		let { todo } = this.props;
	  return (<li>
	        <del>{todo.content}</del>
	    </li>)
	}
}

export default TodoListView;