import React from 'react';

export default class Course extends React.Component {
  render() {
    return (
      <div className="course col-10 mt-4">
        <div className="card bg-light">
          <div className="card-body text-center text-wrap">
            {this.props.courseName}
          </div>
        </div>
      </div>
    );
  }
}
