import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

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

  onMutationCompleted = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this.props.onLogin(token);
    navigate("/");
  };

  render() {
    const { login, email, password, username } = this.state;
    return (
      <Form
        title={login ? "Log in" : "Sign up"}
        onSwitch={this.toggleLogin}
        switchText={login ? "create a new account" : "log in to your account"}
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
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name: username }}
          onCompleted={this.onMutationCompleted}
        >
          {signupOrLoginMutation => (
            <Button onClick={signupOrLoginMutation}>
              {login ? "Log in" : "Sign up"}
            </Button>
          )}
        </Mutation>
      </Form>
    );
  }
}

export default Login;
