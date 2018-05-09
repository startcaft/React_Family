import React from 'react';
import { Link, Route } from 'react-router-dom';

class Other extends React.Component {
    constructor(props){
        super(props);

        this.renderHandler = this.renderHandler.bind(this);
    }

    renderHandler(match){
        return (<div> <h3> {match.match.params.name} </h3></div>)
    }

    render(){
        const match = this.props.match;
        return(
            <div>
                <ul>
                    <li><Link to={`${match.url}/shoes`}>Shoes</Link></li>
                    <li><Link to={`${match.url}/boots`}>Boots</Link></li>
                    <li><Link to={`${match.url}/footwear`}>Footwear</Link></li>
                </ul>
                <hr/>
                <Route path={`${match.path}/:name`} render={this.renderHandler}/>
            </div>
        )
    }
}

export default Other;

    