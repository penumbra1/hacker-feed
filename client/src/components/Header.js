import React, { Component } from "react";
import { Link } from "@reach/router";
import Button from "./Button";
import { AUTH_TOKEN } from "../constants";

const linkStyles = "link mh1 no-underline gray hover-black pointer";

const NavLink = ({ children, ...linkProps }) => (
  <Link
    exact
    className={linkStyles}
    activeClassName="light-purple"
    ariaCurrent="page"
    {...linkProps}
  >
    {children}
  </Link>
);

class Header extends Component {
  handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    this.props.history.push(`/`);
  };

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    // const authToken = true;
    return (
      <header className="flex flex-wrap pa1 mb3 items-center nowrap mw8">
        <h1 className="f4 fw7 mr3 code order-0">
          <span className="mr1">Hacker feed</span>▐
        </h1>
        <nav className="flex items-center fixed bottom-2 static-ns">
          <NavLink to="/">latest</NavLink>
          <span className="mh1 moon-gray" aria-hidden>
            ◼
          </span>
          <NavLink to="/create">submit</NavLink>
          <span className="mh1 moon-gray" aria-hidden>
            ◼
          </span>
          {authToken ? (
            <button
              className={`${linkStyles} bn pa0 bg-transparent`}
              onClick={this.handleLogout}
            >
              log out
            </button>
          ) : (
            <NavLink to="/login">log in</NavLink>
          )}
        </nav>
      </header>
    );
  }
}

export default Header;
