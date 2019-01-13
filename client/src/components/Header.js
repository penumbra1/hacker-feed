import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

const Header = () => {
  return (
    <div className="flex pa1 justify-between items-center nowrap mw8">
      <h1 className="f4 fw7 mr3 code">
        <span className="mr1">Hacker feed</span>▐
      </h1>
      <nav className="flex">
        <NavLink
          exact
          to="/"
          className="mh1 no-underline black-80"
          activeClassName="light-purple"
        >
          latest
        </NavLink>
        <div className="mh2">|</div>
        <NavLink
          exact
          to="/create"
          className="mh1 no-underline black-80"
          activeClassName="light-purple"
        >
          submit
        </NavLink>
      </nav>
    </div>
  );
};

export default withRouter(Header);
