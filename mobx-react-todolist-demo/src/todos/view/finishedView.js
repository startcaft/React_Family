import React, { Component } from 'react';


class FinishedView extends Component{
	render() {
		let { todo } = this.props;
	    return (
            <li>
	            <del>{todo.content}</del>
            </li>
        )
	}
}

export default FinishedView;