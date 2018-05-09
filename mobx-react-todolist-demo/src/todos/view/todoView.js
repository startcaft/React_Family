import React from 'react';

const TodoView = (props) => {
    let {todo,onFinish} = props;

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.finished}
                onClick={() => onFinish(todo)}
                />
            {todo.content}
        </li>
    )
};

export default TodoView;