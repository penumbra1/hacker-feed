import React, { Component } from "react";
import { Router } from "@reach/router";
import gql from "graphql-tag";
import Header from "./Header";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Login from "./Login";
import Account from "./Account";
import { AUTH_TOKEN, AuthContext } from "../auth";
import "../custom.css";
import { Query } from "react-apollo";
import NotFound from "./NotFound";

const USER_QUERY = gql`
  query getCurrentUser {
    currentUser {
      name
    }
  }
`;

class App extends Component {
  handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
  };

  handleLogin = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  render() {
    return (
      <Query query={USER_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data, refetch, client }) => {
          if (error) {
            console.error(error);
            // Fall through to rendering with no data
          }
          const { currentUser } = data;
          const username = currentUser ? currentUser.name : null;
          return (
            <AuthContext.Provider value={{ username }}>
              <div className="sans-serif flex flex-column justify-start pv3 ph4 ph5-m ph7-l mr-auto ml-auto mw8">
                <Header />
                <main>
                  {/* {loading && <div>"Loading..."</div>} */}
                  <Router>
                    <LinkList path="/" />
                    <CreateLink path="/create" />
                    <Account
                      path="/account"
                      onLogout={() => {
                        this.handleLogout();
                        // Write to cache instead of refetch to log out offline
                        client.writeData({
                          data: { currentUser: null }
                        });
                      }}
                    />
                    <Login
                      path="/login"
                      onLogin={token => {
                        this.handleLogin(token);
                        refetch().then(() => window.history.back());
                      }}
                    />
                    <NotFound default />
                  </Router>
                </main>
              </div>
            </AuthContext.Provider>
          );
        }}
      </Query>
    );
  }
}

export default App;
