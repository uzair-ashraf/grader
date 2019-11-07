import React from 'react';
import Header from './header';
import axios from 'axios';
import AppContext from '../lib/context';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInstructor: null,
      instructors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get('api/get_instructors.php')
      .then(response => {
        response.data.reverse();
        this.setState({ instructors: response.data });
      })
      .catch(error => console.error(error));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.selectedInstructor) return;
    this.context.loggingIn(this.state.selectedInstructor)
      .then(() => {
        this.props.history.push('/classes');
      });
  }
  handleChange(e) {
    this.setState({ selectedInstructor: e.target.value });
  }

  render() {
    const disable = !this.state.instructors.length;
    return (
      <>
      <Header/>
        <div className="login-page min-vh-100 row align-items-center">
          <div className="col">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <div className="form-group mt-5">
                <select
                  disabled={disable}
                  onChange={this.handleChange}
                  className="form-control form-control-lg"
                >
                  <option value="">select user</option>
                  {this.state.instructors.map(instructor => {
                    return (
                      <option
                        key={instructor.instructor_id}
                        value={instructor.instructor_id}
                      >
                        {instructor.username}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-lg button">sign in</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

Login.contextType = AppContext;
