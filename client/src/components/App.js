import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Header from "./Header";
import "../styles/App.css";

class App extends Component {
  render() {
    return (
      <div className="system-sans-serif flex flex-column justify-start pv3 ph4 ph5-m ph6-l mr-auto ml-auto mw8">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
