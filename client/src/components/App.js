import React, { Component } from "react";
import { Router } from "@reach/router";
import { Query } from "react-apollo";
import { USER_QUERY } from "../graphql";
import Header from "./Header";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Login from "./Login";
import Account from "./Account";
import Search from "./Search";
import { AUTH_TOKEN, AuthContext } from "../auth";
import "../custom.css";
import NotFound from "./NotFound";

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
          const userId = currentUser ? currentUser.id : null;
          return (
            <AuthContext.Provider value={{ username, userId }}>
              <div className="sans-serif ph4 ph5-6-m ph7-l mr-auto ml-auto mw8">
                <Header />
                <main className="mb6 relative">
                  {/* {loading && <div>"Loading..."</div>} */}
                  <Router>
                    <LinkList path="/" />
                    <Search path="/search" />
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
                      onLogin={async token => {
                        this.handleLogin(token);
                        await refetch();
                        window.history.back();
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
