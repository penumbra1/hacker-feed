import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import Header from "./Header";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <div className="system-sans-serif flex flex-column justify-start pv3 ph4 ph5-m ph7-l mr-auto ml-auto mw8">
        <Header />
        <main>
          <Router>
            <LinkList path="/" />
            <CreateLink path="/create" />
            <Login path="/login" />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
