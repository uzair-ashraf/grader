import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './homepage';
import AppContext from '../lib/context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  render() {
    return (
      <div className="container min-vh-100">
        <Router>
          <Route exact path ="/" component={HomePage}/>
        </Router>
      </div>
    );
  }
}
