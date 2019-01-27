import React from "react";

const Error = ({ message, className }) => {
  return (
    <div className={`code f6 dark-red ${className}`}>
      <span className="f4 mr2 dark-red">⚠</span>
      {message}
    </div>
  );
};

export default Error;
