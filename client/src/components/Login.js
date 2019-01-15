import React, { Component } from "react";
import { AUTH_TOKEN } from "./constants";

class Login extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    name: ""
  };

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? "Log in" : "Sign up"}</h4>
        <form className="flex flex-column" />
        {!login && (
          <input
            id="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
        )}
        <input
          id="email"
          type="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          id="password"
          type="password"
          minLength={6}
          value={password}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Login;
