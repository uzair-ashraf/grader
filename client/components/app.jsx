import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
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
      <div className="min-vh-100 d-flex pt-5">
        <Route path ="/" Component={HomePage}/>
      </div>
    );
  }
}
