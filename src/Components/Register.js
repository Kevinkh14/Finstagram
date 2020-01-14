import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, getSession } from "../Redux/reducers/userReducer";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      name: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const { email, username, name, password } = this.state;
    const { registerUser } = this.props;
    registerUser({ email, username, name, password });
  };

  render() {
    if (this.props.user_id) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div className = 'register'>
        <div className = 'register-container'>
          <section>
            <h1 className = 'title'>Finstagram</h1>
          </section>
          <section>
            <TextField
              id="outlined-email-input"
              label="Email"
              type="text"
              name="email"
              autoComplete="Email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              required
            ></TextField>
          </section>
          <section>
            <TextField
              id="outlined-name-input"
              label="Full Name"
              type="text"
              name="name"
              autoComplete="Name"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              required
            ></TextField>
          </section>
          <section>
            <TextField
              id="outlined-Username-input"
              label="Username"
              type="text"
              name="username"
              autoComplete="username"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              required
            ></TextField>
          </section>
          <section>
            <TextField
              id="outlined-Password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="password"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              required
            ></TextField>
          </section>
          <section>
            <Button
              variant="contained"
              color="primary"
              className="register-Button"
              id="register-button"
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </section>
        </div>
        <div className = 'signup'>
          <p>
            Have an account? <Link to="/">Log in</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user_id: reduxState.userReducer.user_id
  };
};

export default connect(mapStateToProps, {
  registerUser,
  getSession
})(Register);
