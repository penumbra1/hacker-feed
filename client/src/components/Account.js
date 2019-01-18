import React, { Component } from "react";
import { Redirect } from "@reach/router";
import { AuthContext } from "../auth";
import Button from "./Button";
import Headline from "./Headline";

class Account extends Component {
  static contextType = AuthContext;

  handleLogoutClick = async () => {
    // Navigate to /, and only then log the user out to avoid a redirect
    await this.props.navigate("/");
    // this.props.onLogout causes a context update in App
    // setTimeout makes sure App updates after navigation to / is complete
    setTimeout(() => this.props.onLogout(), 0);
  };

  render() {
    const { username } = this.context;

    if (username === null) return <Redirect from="/account" to="/login" />;

    return (
      <div className="mv4-5 pv4 tc">
        <Headline>{`Hi there, ${username}!`}</Headline>
        <Button onClick={this.handleLogoutClick} className="mr-auto">
          Log out
        </Button>
      </div>
    );
  }
}

export default Account;
