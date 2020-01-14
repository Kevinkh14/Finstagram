import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      users: []
    };
  }
  handleChange = e => {
    this.setState({ search: e.target.value });
    e.preventDefault();
    axios.get("/api/userSearch").then(res => {
      this.setState({ users: res.data });
      console.log(this.state.users);
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    axios.get("/api/userSearch").then(res => {
      this.setState({ users: res.data });
      console.log(this.state.users);
    });
  };
  render() {
    let display = this.state.users
      .filter((e, i) => {
        console.log(e);
        return e.includes(this.state.search);
      })
      .map((e, i) => {
        return <h2>{e}</h2>;
      });
    return (
      <div className="nav">
        <div className="nav-container">
          <Link to="/Dashboard">
            <section className="home">
              <i class="fab fa-instagram fa-2x"></i>
              <h1 className="title">Finstagram</h1>
            </section>
          </Link>
          <section>
            <input
              placeholder="Search"
              // onClick={this.handleSubmit}
              onChange={this.handleChange}
            ></input>
            <button>search</button>
            <div>
              {this.state.users
                ?
                <h2>{display}</h2>
                : null}
            </div>
          </section>
          <section className="icons">
            <Link to="/explore">
              <i class="far fa-compass fa-lg"></i>
            </Link>
            <i class="far fa-heart fa-lg"></i>
            <Link to="/profile">
              <i class="far fa-user fa-lg"></i>
            </Link>
          </section>
        </div>
      </div>
    );
  }
}

export default Nav;
