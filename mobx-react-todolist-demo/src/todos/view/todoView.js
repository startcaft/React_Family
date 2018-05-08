import React from 'react';
import { observer } from 'mobx-react';

const TodoView = observer((props) => {
    let {todo} = props;
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.finished}
                // onClick={todo.finish.bind(todo)}
                />
            {todo.content}
        </li>
    )
});

export default TodoView;