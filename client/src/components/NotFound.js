import React from "react";
import Headline from "./Headline";

const NotFound = () => {
  return (
    <div className="mv4-5 pv4 tc relative">
      <Headline>
        <div
          className="code normal f-10 light-purple o-10 absolute right-0 left-0"
          style={{ transform: "scaleY(2.8)", zIndex: -1 }}
        >
          404
        </div>
        You have ventured into the unknown...
      </Headline>
    </div>
  );
};

export default NotFound;
