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
      user: null
    };
    this.loggingIn = this.loggingIn.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.createCourse = this.createCourse.bind(this);
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
  createCourse(course) {
    axios.post('/api/add_course', course)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }
  render() {
    const contextValue = {
      user: this.state.user,
      loggingIn: this.loggingIn,
      isLoggedIn: this.isLoggedIn,
      logout: this.logout,
      createCourse: this.createCourse
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
