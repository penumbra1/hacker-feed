import React from "react";
import Headline from "./Headline";

const Form = ({
  className = "",
  title,
  onSwitch,
  switchText,
  children,
  ...formProps
}) => {
  return (
    <form
      className={`flex flex-column mv4-5 pv4 measure-ns ${className}`}
      {...formProps}
    >
      <div className="flex items-baseline">
        {title && <Headline>{title}</Headline>}
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
