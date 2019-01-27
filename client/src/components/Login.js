import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_MUTATION, LOGIN_MUTATION } from "../graphql";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import Error from "./Error";

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

  toggleLoginOrSignup = () => {
    this.setState(({ login }) => ({ login: !login }));
  };

  onMutationCompleted = data => {
    const { token } = this.state.login ? data.login : data.signup;
    this.props.onLogin(token);
  };

  render() {
    const { login, email, password, username } = this.state;

    return (
      <Mutation
        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
        onCompleted={this.onMutationCompleted}
      >
        {(signupOrLoginMutation, { error }) => (
          <>
            {error && (
              <Error
                message={error.graphQLErrors.map(e => e.message).join("\n")}
                className="absolute"
              />
            )}
            <Form
              title={login ? "Log in" : "Sign up"}
              onSwitch={this.toggleLoginOrSignup}
              switchText={
                login ? "create a new account" : "log in to your account"
              }
              onSubmit={e => {
                e.preventDefault();
                signupOrLoginMutation({
                  variables: { email, password, name: username }
                });
              }}
            >
              {!login && (
                <Input
                  labelText="Username"
                  id="username"
                  type="text"
                  value={username}
                  required
                  onChange={this.handleChange}
                />
              )}
              <Input
                labelText="Email"
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                required
                onChange={this.handleChange}
                className={error ? "bl-accent" : ""}
              />
              <Input
                labelText="Password"
                id="password"
                type="password"
                autoComplete={login ? "current-password" : "new-password"}
                minLength={6}
                value={password}
                required
                onChange={this.handleChange}
              />
              <Button>{login ? "Log in" : "Sign up"}</Button>
            </Form>
          </>
        )}
      </Mutation>
    );
  }
}

export default Login;
