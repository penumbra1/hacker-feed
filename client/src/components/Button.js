import React from "react";

export const buttonStyles =
  "button f6 code ttu tracked link dim br1 ph3 pv2 mv2 ml-auto db pointer";

const Button = ({ children, className, line, ...buttonProps }) => {
  return (
    <button
      type="button" // prevents form submission
      className={`${buttonStyles} ${
        line
          ? "bg-transparent ba b--light-purple light-purple"
          : "bg-light-purple bn washed-blue"
      } ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
