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
      },
      addGradeForm: {
        student: '',
        grade: ''
      }
    };
    this.trackCourse = this.trackCourse.bind(this);
    this.trackStudent = this.trackStudent.bind(this);
    this.trackSelectedStudent = this.trackSelectedStudent.bind(this);
    this.trackGrade = this.trackGrade.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.createStudent = this.createStudent.bind(this);
    this.createGrade = this.createGrade.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ modalDisplayed: false });
    }
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
  trackSelectedStudent(e) {
    const addGradeForm = { ...this.state.addGradeForm };
    addGradeForm.student = e.target.value;
    this.setState({ addGradeForm });
  }
  trackGrade(e) {
    const addGradeForm = { ...this.state.addGradeForm };
    addGradeForm.grade = e.target.value;
    this.setState({ addGradeForm });
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
    this.context.createStudent(addStudentForm);
  }
  createGrade(e) {
    e.preventDefault();
    const addGradeForm = { ...this.state.addGradeForm };
    addGradeForm.instructor_id = this.context.user.instructor_id;
    addGradeForm.course_id = this.context.currentCourse;
    console.log(addGradeForm);
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
      if (pathname.includes('/grades/')) {
        console.log(this.context.currentGrades);
        console.log(this.context.currentCourse);
        let currentStudents;
        if (!this.context.currentGrades.length) {
          currentStudents = this.context.user.students;
        } else {
          let ignoredIds = this.context.currentGrades.map(grade => grade.student_id);
          console.log(ignoredIds);
          currentStudents = this.context.user.students.filter(student => {
            return !ignoredIds.includes(student.student_id);
          });
        }
        return (
          <div className="modal-container">
            <div className="modal-background" />
            <div className="modal">
              <div onClick={() => this.setState({ modalDisplayed: !this.state.modalDisplayed })} className="fas fa-times close-modal" />
              <form className="modal-form text-center" onSubmit={this.createGrade}>
                <div className="form-group text-center">
                  <select
                    onChange={this.trackSelectedStudent}
                    className="form-control form-control-lg"
                    id="studentName"
                  >
                    <option value="">
                      Select A Student
                    </option>
                    {
                      currentStudents.map(student => {
                        return (
                          <option
                            key={student.student_id}
                            value={student.student_id}
                          >
                            {student.name}
                          </option>
                        );
                      })
                    }
                  </select>
                  <label htmlFor="grade">Grade</label>
                  <input
                    type="number"
                    name="grade"
                    className="form-control"
                    max="100"
                    min="0"
                    id="grade"
                    value={this.state.addGradeForm.grade}
                    onChange={this.trackGrade}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: '#040CD4' }}
                    className="btn btn-primary mt-3"
                  >
                    Add Grade
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
