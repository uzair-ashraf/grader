import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../lib/context';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="landing-page min-vh-100 row align-items-center">
        <div className="col">
          <div className="heading">
        grader.
          </div>
          <div className="subheading mt-5">
        A platform for instructors to organize their student’s grades.
          </div>
          <div className="homepage-button mt-5">
            <Link to="/login">
              <button className="btn btn-primary btn-lg button">login</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.contextType = AppContext;
