import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NoMatch,home as Home,main as Main } from './commons/index';
import { login as LoginForm } from './login/index';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/main" component={Main}/>
              <Route path="/login" component={LoginForm}/>
              <Route component={NoMatch}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
