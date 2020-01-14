import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, getSession } from "../Redux/reducers/userReducer";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
 
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = () => {
    const { username, password } = this.state;
    const { loginUser } = this.props;
    loginUser({  username, password });
  };

  render() {
    if (this.props.user_id) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div className="login">
        <div className="login-container">
          <div>
            <section>
              <h1 className="title">Finstagram</h1>
            </section>
            <section className = 'username'>
              <TextField
                id="outlined-Username-input"
                label="Username"
                type="text"
                name="username"
                autoComplete="username"
                margin="normal"
                variant="outlined"
                onChange ={this.handleChange}
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
                onChange ={this.handleChange}
                required
              ></TextField>
            </section>
            <section>
              <Button
                variant="contained"
                color="primary"
                className="Login-Button"
                id="login-button"
                onClick ={this.handleSubmit}
              >
                Login
              </Button>
            </section>
          </div>
          <p>--------  OR  --------</p>
          <div>
            <h4>Log in with Fakebook</h4>
            <p>Forgot Password?</p>
          </div>
        </div>
        <div className="signup">
          <p>
            Dont have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
        <p>Get the app.</p>
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
  loginUser,
  getSession
})(Login);

