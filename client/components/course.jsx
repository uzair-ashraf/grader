import React from 'react';
import { Link } from 'react-router-dom';

export default class Course extends React.Component {
  render() {
    return (
      <div className="course col-10 mt-4">
        <div className="card bg-light">
          <Link to={`/grades/${this.props.id}`}>
            <div className="card-body text-center text-wrap">
              {this.props.courseName}
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
