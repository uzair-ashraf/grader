import React from 'react';
import AppContext from '../lib/context';

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplayed: false,
      addCourseForm: {
        name: ''
      },
      addStudentForm: {
        name: '',
        notes: ''
      }
    };
    this.trackCourse = this.trackCourse.bind(this);
    this.trackStudent = this.trackStudent.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.createStudent = this.createStudent.bind(this);
  }
  trackCourse({ target: { name, value } }) {
    const addCourseForm = { ...this.state.addCourseForm };
    addCourseForm[name] = value;
    this.setState({ addCourseForm });
  }
  trackStudent({ target: { name, value } }) {
    const addStudentForm = { ...this.state.addStudentForm };
    addStudentForm[name] = value;
    this.setState({ addStudentForm });
  }
  createCourse(e) {
    e.preventDefault();
    const addCourseForm = { ...this.state.addCourseForm };
    addCourseForm.instructor_id = this.context.user.instructor_id;
    this.context.createCourse(addCourseForm);
  }
  createStudent(e) {
    e.preventDefault();
    const addStudentForm = { ...this.state.addStudentForm };
    addStudentForm.instructor_id = this.context.user.instructor_id;
    console.log(addStudentForm);
  }
  render() {
    const { pathname } = this.props.location;
    if (pathname === '/' || pathname === '/login') return null;
    if (this.state.modalDisplayed) {
      if (pathname === '/classes') {
        return (
          <div className="modal-container">
            <div className="modal-background" />
            <div className="modal">
              <div onClick={() => this.setState({ modalDisplayed: !this.state.modalDisplayed })} className="fas fa-times close-modal" />
              <form className="modal-form" onSubmit={this.createCourse}>
                <div className="form-group text-center">
                  <label htmlFor="courseName">Class Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    maxLength="62"
                    id="courseName"
                    value={this.state.addCourseForm.name}
                    onChange={this.trackCourse}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: '#040CD4' }}
                    className="btn btn-primary mt-3"
                  >
                    Create Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }
      if (pathname === '/students') {
        return (
          <div className="modal-container">
            <div className="modal-background" />
            <div className="modal">
              <div onClick={() => this.setState({ modalDisplayed: !this.state.modalDisplayed })} className="fas fa-times close-modal" />
              <form className="modal-form text-center" onSubmit={this.createStudent}>
                <div className="form-group">
                  <label htmlFor="studentName">Student Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    maxLength="62"
                    id="studentName"
                    value={this.state.addStudentForm.name}
                    onChange={this.trackStudent}
                    autoComplete="off"
                  />
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    id="notes"
                    rows="3"
                    value={this.state.addStudentForm.notes}
                    onChange={this.trackStudent}
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: '#040CD4' }}
                    className="btn btn-primary mt-3"
                  >
                    Create Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }
    }
    return (
      <div onClick={() => this.setState({ modalDisplayed: !this.state.modalDisplayed })}
        className="add-button">
        <i className="fas fa-plus"/>
      </div>
    );
  }
}

AddButton.contextType = AppContext;
