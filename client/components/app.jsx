import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './homepage';
import Login from './login';
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
      getUserData: this.getUserData.bind(this),
      isLoggedIn: this.isLoggedIn.bind(this)
    };
  }
  getUserData(user) {
    axios.get(`api/instructor_data.php?id=${user}`)
      .then(response => this.setState({ user: response.data }))
      .catch(error => console.error(error));
  }
  isLoggedIn() {
    return !!this.state.user;
  }
  render() {
    return (
      <div className="container min-vh-100">
        <AppContext.Provider value={this.contextValue}>
          <Router>
            <Route exact path ="/" component={HomePage}/>
            <Route exact path="/login" component={Login}/>
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}
