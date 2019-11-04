import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './homepage';
import Login from './login';
import AppContext from '../lib/context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.contextValue = {
      getUserData: this.getUserData.bind(this)
    };
  }
  getUserData(user) {

  }
  render() {
    return (
      <div className="container min-vh-100">
        <AppContext.Provider value={this.contextValue}>
          <Router>
            <Route exact path ="/" component={HomePage}/>
            <Route exact path="/login" component={Login} />
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}
