import React from "react";

const Button = ({ children, className, ...buttonProps }) => {
  return (
    <button
      type="button" // prevents form submission
      className={`button code f6 link dim br1 ph3 pv2 mv2 db self-end washed-yellow bg-light-purple ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
