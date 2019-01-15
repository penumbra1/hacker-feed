import React from "react";

const Form = ({ className, header, children }) => {
  return (
    <form
      className={`flex flex-column pv4 ph2 measure-ns ${className}`}
      style={{ margin: "6rem 0" }}
    >
      <div className="flex items-center mb2">{header}</div>
      {children}
    </form>
  );
};

export default Form;
