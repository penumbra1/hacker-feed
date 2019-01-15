import React from "react";

const Input = ({ labelText, id, className, ...inputProps }) => {
  return (
    <>
      <label htmlFor={id} className={`f6 code ttu tracked db mb2 ${className}`}>
        {labelText}
      </label>
      <input
        id={id}
        className="input-reset ba br1 b--black-50 pa2 mb3 db w-100"
        {...inputProps}
      />
    </>
  );
};

export default Input;
