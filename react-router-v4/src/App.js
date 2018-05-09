import React, { Component } from 'react';
import { Route, Link,Switch } from "react-router-dom";
import Other from './other';

class Home extends Component{
    render(){
        return (
            <div>this a Home page</div>
        )
    }
}

class App extends Component{
    render(){
        return (
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/other">其他页</Link></li>
                </ul>
                <hr/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/other" component={Other}/>
                </Switch>
            </div>
        )
    }
}

export default App;
