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
      <header className="flex flex-wrap items-center nowrap pv3 w-100 mw8 sticky top-0 z-1 bg--grad-bottom">
        <h1 className="f4 fw7 mv0 mr2 mr3-ns pv3 code">
          <Link to="/" className={`${linkStyles} black`}>
            <span className="mr1">Hacker feed</span>
            <span aria-hidden>▐</span>
          </Link>
        </h1>
        <nav className="flex items-center pv3 fixed bottom-0 w-100 w-auto-nsm bg--grad-top header-nav">
          <NavLink to="/search">search</NavLink>
          <Separator />
          <NavLink to="/create">post</NavLink>
          <Separator />
          {username ? (
            <NavLink to="/account">account</NavLink>
          ) : (
            <NavLink to="/login">log in</NavLink>
          )}
        </nav>
        <div id="searchButtonPortal" className="w-20 w-auto-l flex-auto" />
      </header>
    );
  }
}

export default Header;
