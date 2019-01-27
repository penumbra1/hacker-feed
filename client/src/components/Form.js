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
            <button
              className="link dim bn light-purple bg-transparent pointer"
              type="button"
              onClick={onSwitch}
            >
              {switchText}
            </button>
          </span>
        )}
      </div>
      {children}
    </form>
  );
};

export default Form;
