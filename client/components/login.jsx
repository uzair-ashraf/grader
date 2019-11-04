import React from 'react';
import Header from './header';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      users: []
    };
  }
  componentDidMount() {
    axios.get();
  }

  handleSubmit() {

  }
  render() {
    return (
      <>
      <Header/>
      <div className="login-page min-vh-100 row align-items-center">
        <div className="col">
          <form className="login-form">

          </form>
          <div className="homepage-button mt-5">
            <button className="btn btn-primary btn-lg button">sign in</button>
          </div>
        </div>
      </div>
      </>
    );
  }
}
