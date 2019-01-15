import React from "react";

export const buttonStyles =
  "button code f6 link dim br1 ph3 pv2 mv2 ml-auto db pointer";
const buttonTheme = "washed-yellow bg-light-purple";

const Button = ({ children, className, line, ...buttonProps }) => {
  return (
    <button
      type="button" // prevents form submission
      className={`${buttonStyles} ${
        line
          ? "bg-transparent ba b--light-purple light-purple"
          : "bn washed-blue bg-light-purple"
      } ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
