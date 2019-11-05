import React from 'react';

export default class Student extends React.Component {
  render() {
    return (
      <div className="student col-10 mt-4">
        <div className="card bg-light">
          <div className="card-body text-center text-wrap">
            {this.props.studentName}
          </div>
        </div>
      </div>
    );
  }
}
