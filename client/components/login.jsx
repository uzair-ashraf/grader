import React from 'react';
import Header from './header';
import axios from 'axios';

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
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.selectedInstructor);
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
            <select
              disabled={disable}
              onChange={this.handleChange}
            >
              <option value="">Select User</option>
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
            <button type="submit" className="btn btn-primary btn-lg button">sign in</button>
          </form>
        </div>
      </div>
      </>
    );
  }
}
