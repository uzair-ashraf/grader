import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../lib/context';
export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: this.props.courseName
    };
    this.handleCourseChange = this.handleCourseChange.bind(this);
  }
  handleCourseChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    const handleClick = e => {
      e.stopPropagation();
      this.setState({ editing: !this.state.editing });
    };
    const courseName = this.state.editing
      ? (<input
        type="text"
        name="name"
        className="form-control editCourse"
        maxLength="62"
        id="courseName"
        value={this.state.value}
        onChange={this.handleCourseChange}
        autoComplete="off"
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />)
      : this.props.courseName;
    const buttons = this.state.editing
      ? (
        <div className="col-3 my-auto text-center">
          <div className="row justify-content-end">
            <button className="btn btn-primary mr-1">Update</button>
            <button
              onClick={() => this.setState({ editing: !this.state.editing })}
              className="btn btn-warning mr-1">
              Cancel
            </button>
            <button
              onClick={() => this.context.deleteCourse(this.props.id)}
              className="btn btn-danger mr-1">
              Delete
            </button>
          </div>

        </div>
      )
      : (
        <div className="col-3 my-auto text-center" onClick={handleClick}>
          <i className="fas fa-edit" />
        </div>
      );
    return (
      <div className="course col-10 mt-4">
        <div className="card bg-light course-body row">
          <Link to={`/grades/${this.props.id}`} className="col-9 text-center">
            <div className="card-body text-center text-wrap">
              {courseName}
            </div>
          </Link>
          {buttons}
        </div>
      </div>
    );
  }
}

Course.contextType = AppContext;
