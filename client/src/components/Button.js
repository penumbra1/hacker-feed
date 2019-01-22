import React, { memo } from "react";

export const buttonStyles =
  "button f6 code ttu tracked link dim bg-light-purple ba b--transparent washed-blue br1 ph3 pv2 mt2 ml-auto db pointer";

const Button = ({ children, className = "", ...buttonProps }) => {
  return (
    <button className={`${buttonStyles} ${className}`} {...buttonProps}>
      {children}
    </button>
  );
};

export default memo(Button);
