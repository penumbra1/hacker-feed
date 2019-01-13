import React from "react";

const Link = props => (
  <div className="mv3">
    <div>
      <h2 className="athelas f5 fw6 mv1 measure-wide">
        {props.link.description}
      </h2>
      <a
        className="f6 db link code truncate gray no-underline pointer underline-hover"
        href={props.link.url}
      >
        {props.link.url}
      </a>
    </div>
  </div>
);

export default Link;
