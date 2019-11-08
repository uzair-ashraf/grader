import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import HomePage from './homepage';
import Login from './login';
import Classes from './classes';
import Students from './students';
import GradeTable from './grade-table';
import axios from 'axios';
import AppContext from '../lib/context';
import AddButton from './add-button';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentGrades: [],
      currentCourse: null
    };
    this.loggingIn = this.loggingIn.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.getGrades = this.getGrades.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.createStudent = this.createStudent.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }
  loggingIn(user) {
    return axios.get(`api/instructor_data.php?id=${user}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => console.error(error));
  }
  isLoggedIn() {
    return !!this.state.user;
  }
  logout() {
    this.setState({ user: null });
  }
  getGrades(courseId) {
    const { instructor_id } = this.state.user;
    axios.get(`/api/get_grades.php?c_id=${courseId}&i_id=${instructor_id}`)
      .then(response => this.setState({ currentGrades: response.data, currentCourse: courseId }))
      .catch(error => console.error(error));
  }
  createCourse(course) {
    axios.post('/api/add_course.php', course)
      .then(response => {
        const userCopy = { ...this.state.user };
        userCopy.courses = userCopy.courses.map(courseData => Object.assign({}, courseData));
        userCopy.students = userCopy.students.map(studentData => Object.assign({}, studentData));
        userCopy.courses.push(response.data);
        this.setState({ user: userCopy });
      })
      .catch(error => console.error(error));
  }
  createStudent(student) {
    axios.post('/api/add_student.php', student)
      .then(response => {
        const userCopy = { ...this.state.user };
        userCopy.courses = userCopy.courses.map(courseData => Object.assign({}, courseData));
        userCopy.students = userCopy.students.map(studentData => Object.assign({}, studentData));
        userCopy.students.push(response.data);
        this.setState({ user: userCopy });
      });
  }
  createGrade(grade) {
    axios.post('/api/add_grade.php', grade)
      .then(response => {
        const gradesCopy = this.state.currentGrades.map(grade => {
          return Object.assign({}, grade);
        });
        gradesCopy.push(response.data);
        this.setState({ currentGrades: gradesCopy });
      })
      .catch(error => console.error(error));
  }
  deleteGrade(gradeId) {
    axios.post('/api/delete_grade.php', {
      'id': gradeId
    })
      .then(response => {
        const updatedGrades = this.state.currentGrades.filter(grade => {
          return response.data.deleted_id !== grade.grade_id;
        });
        this.setState({ currentGrades: updatedGrades });
      })
      .catch(error => console.error(error));
  }
  deleteCourse(courseId) {
    axios.post('/api/delete_course.php', {
      'id': courseId
    })
      .then(response => {
        const userCopy = { ...this.state.user };
        userCopy.courses = userCopy.courses.map(courseData => Object.assign({}, courseData));
        userCopy.courses = userCopy.courses.filter(course => {
          return response.data.deleted_id !== course.course_id;
        });
        this.setState({ user: userCopy });
      })
      .catch(error => console.error(error));
  }
  deleteStudent(studentId) {
    axios.post('/api/delete_student.php', {
      'id': studentId
    })
      .then(response => {
        const userCopy = { ...this.state.user };
        userCopy.students = userCopy.students.map(student => Object.assign({}, student));
        userCopy.students = userCopy.students.filter(student => {
          return response.data.deleted_id !== student.student_id;
        });
        this.setState({ user: userCopy });
      })
      .catch(error => console.error(error));
  }
  updateCourse(course) {
    axios.post('/api/update_course.php', course)
      .then(response => {
        const userCopy = { ...this.state.user };
        userCopy.courses = userCopy.courses.map(courseData => Object.assign({}, courseData));
        const courseIndex = userCopy.courses.findIndex(course => course.course_id === response.data.course_id);
        userCopy.courses[courseIndex] = response.data;
        this.setState({ user: userCopy });
      })
      .catch(error => console.error(error));
  }
  updateStudent(student) {
    console.log(student);
  }
  render() {
    const contextValue = {
      user: this.state.user,
      currentGrades: this.state.currentGrades,
      currentCourse: this.state.currentCourse,
      loggingIn: this.loggingIn,
      isLoggedIn: this.isLoggedIn,
      logout: this.logout,
      setGrades: this.setGrades,
      getGrades: this.getGrades,
      createCourse: this.createCourse,
      createStudent: this.createStudent,
      createGrade: this.createGrade,
      deleteGrade: this.deleteGrade,
      deleteCourse: this.deleteCourse,
      deleteStudent: this.deleteStudent,
      updateCourse: this.updateCourse,
      updateStudent: this.updateStudent
    };
    const AddButtonWithRouter = withRouter(AddButton);
    return (
      <AppContext.Provider value={contextValue}>
        <Router>
          <AddButtonWithRouter />
          <div className="container min-vh-100 pt-5">
            <Route exact path ="/" component={HomePage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/classes" component={Classes} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/grades/:courseId" component={GradeTable} />
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}
