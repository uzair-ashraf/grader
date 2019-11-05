import React from 'react';
import AppContext from '../lib/context';
import { Drawer } from '@material-ui/core';

export default class Header extends React.Component {
  render() {
    if (!this.context.user) {
      return (
        <header className="navbar fixed-top navbar-light bg-light border-bottom py-0 justify-content-center navigation">
        grader.
        </header>
      );
    } else {
      return (
        <header className="navbar fixed-top navbar-light bg-light border-bottom py-0 justify-content-center navigation">
          grader.
          <div className="appDrawer">
            <i className="fas fa-bars" />
          </div>
        </header>
      );
    }
  }
}

Header.contextType = AppContext;
