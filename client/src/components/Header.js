import React, { Component } from "react";
import { Link } from "@reach/router";
import { AuthContext } from "../auth";

const linkStyles = "link ph2 pv3 no-underline hover-black pointer";
const applyActiveStyle = ({ isCurrent }) => {
  return { className: `${linkStyles}${isCurrent ? " light-purple" : " gray"}` };
};
const NavLink = ({ children, ...linkProps }) => (
  <Link className={linkStyles} getProps={applyActiveStyle} {...linkProps}>
    {children}
  </Link>
);

const Separator = () => (
  <span className="moon-gray" aria-hidden>
    ◼
  </span>
);

class Header extends Component {
  static contextType = AuthContext;

  render() {
    const { username } = this.context;
    return (
      <header className="flex flex-wrap mb3 items-center nowrap mw8">
        <h1 className="f4 fw7 mr3 code ">
          <Link to="/" className={`${linkStyles} black`}>
            <span className="mr1">Hacker feed</span>
            <span aria-hidden>▐</span>
          </Link>
        </h1>
        <nav className="flex items-center fixed bottom-1 static-l">
          {/* <NavLink to="/">latest</NavLink>
          <span className="moon-gray" aria-hidden>
            ◼
          </span> */}
          <NavLink to="/create">post</NavLink>
          <Separator />
          <NavLink to="/search">search</NavLink>
          <Separator />
          {username ? (
            <NavLink to="/account">account</NavLink>
          ) : (
            <NavLink to="/login">log in</NavLink>
          )}
        </nav>
      </header>
    );
  }
}

export default Header;
