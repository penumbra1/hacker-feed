import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { AUTH_TOKEN } from "../constants";

class Login extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    username: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  toggleLogin = () => {
    this.setState(({ login }) => ({ login: !login }));
  };

  async handleSubmit(e) {}

  saveUserData(token) {}

  render() {
    const { login, email, password, username } = this.state;
    return (
      <Form
        header={
          <>
            <h1 className="f4 mv3">{login ? "Log in" : "Sign up"}</h1>
            <span className="ml-auto">
              {"or "}
              <a
                href="#"
                onClick={this.toggleLogin}
                className="link dim light-purple"
              >
                {login ? "create a new account" : "log in to your account"}
              </a>
            </span>
          </>
        }
      >
        {!login && (
          <Input
            labelText="Username"
            id="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />
        )}
        <Input
          labelText="Email"
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={this.handleChange}
        />
        <Input
          labelText="Password"
          id="password"
          type="password"
          autoComplete={login ? "current-password" : "new-password"}
          minLength={6}
          value={password}
          onChange={this.handleChange}
        />
        {/* <Mutation
          mutation={{}}
          variables={{}}
          onCompleted={() => this.props.history.push("/")}
        >
          {postMutation => <Button onClick={postMutation}>Submit</Button>}
        </Mutation> */}
      </Form>
    );
  }
}

export default Login;
