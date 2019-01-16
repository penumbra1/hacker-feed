import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import Header from "./Header";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Login from "./Login";
import { AUTH_TOKEN, AuthContext } from "../auth";
import "../custom.css";

class App extends Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    // For now I'm assuming a token is valid until explicitly removed by the client
    // Later I'll add a query to the server to check if the token is still valid
    const token = localStorage.getItem(AUTH_TOKEN);
    this.setState({ isLoggedIn: !!token });
  }

  handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    this.setState({ isLoggedIn: false });
    navigate(`/`);
  };

  handleLogin = token => {
    localStorage.setItem(AUTH_TOKEN, token);
    this.setState({ isLoggedIn: true });
    navigate(`/`);
  };

  render() {
    return (
      <AuthContext.Provider value={{ isLoggedIn: this.state.isLoggedIn }}>
        <div className="sans-serif flex flex-column justify-start pv3 ph4 ph5-m ph7-l mr-auto ml-auto mw8">
          <Header onLogout={this.handleLogout} />
          <main>
            <Router>
              <LinkList path="/" />
              <CreateLink path="/create" />
              <Login path="/login" onLogin={this.handleLogin} />
            </Router>
          </main>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
