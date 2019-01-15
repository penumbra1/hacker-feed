import React from "react";

const Form = ({ className, children }) => {
  return (
    <form className={`flex flex-column pv4 ph2 measure-ns ${className}`}>
      {children}
    </form>
  );
};

export default Form;
