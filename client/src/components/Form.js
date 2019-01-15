import React from "react";

const Form = ({ className, title, onSwitch, switchText, children }) => {
  return (
    <form className={`flex flex-column mv4-5 pv4 ph2 measure-ns ${className}`}>
      <div className="flex items-baseline mb3">
        <h1 className="f4 mv3 athelas">{title}</h1>
        {switchText && (
          <span className="ml-auto">
            {"or "}
            <a
              href="#"
              onClick={e => {
                e.target.blur();
                onSwitch();
              }}
              className="link dim light-purple"
            >
              {switchText}
            </a>
          </span>
        )}
      </div>
      {children}
    </form>
  );
};

export default Form;
