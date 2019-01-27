import React, { memo } from "react";

const Input = ({ labelText, id, className = "", ...inputProps }) => {
  return (
    <div className="mb3">
      <label htmlFor={id} className="f6 code ttu tracked db mb2">
        {labelText}
      </label>
      <input
        id={id}
        className={`input-reset ba br1 b--black-50 pa2 w-100 ${className}`}
        {...inputProps}
      />
    </div>
  );
};

export default memo(Input);
