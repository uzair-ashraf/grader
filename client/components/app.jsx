import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './homepage';
import Login from './login';
import Classes from './classes';
import axios from 'axios';
import AppContext from '../lib/context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.contextValue = {
      user: this.state.user,
      isLoggedIn: this.isLoggedIn.bind(this)
    };
  }

  isLoggedIn() {
    return !!this.state.user;
  }
  render() {
    return (
      <div className="container min-vh-100 pt-5">
        <AppContext.Provider value={this.contextValue}>
          <Router>
            <Route exact path ="/" component={HomePage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/classes" component={Classes} />
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}
