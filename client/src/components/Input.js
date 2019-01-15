import React from "react";

const Input = ({ labelText, id, className, ...inputProps }) => {
  return (
    <>
      <label htmlFor={id} className={`f6 b db mb2 ${className}`}>
        {labelText}
      </label>
      <input
        id={id}
        className="input-reset ba b--black-50 pa2 mb2 db w-100"
        {...inputProps}
      />
    </>
  );
};

export default Input;
