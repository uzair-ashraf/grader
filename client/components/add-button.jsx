import React from 'react';
import AppContext from '../lib/context';

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplayed: false,
      addCourseForm: {
        name: ''
      }
    };
    this.trackCourse = this.trackCourse.bind(this);
    this.createCourse = this.createCourse.bind(this);
  }
  trackCourse({ target: { name, value } }) {
    const addCourseForm = { ...this.state.addCourseForm };
    addCourseForm[name] = value;
    this.setState({ addCourseForm });
  }
  createCourse(e) {
    e.preventDefault();
    const addCourseForm = { ...this.state.addCourseForm };
    addCourseForm.instructor_id = this.context.user.instructor_id;
    this.context.createCourse(addCourseForm);
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
