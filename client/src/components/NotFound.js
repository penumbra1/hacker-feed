import React from "react";
import Headline from "./Headline";

const NotFound = () => {
  return (
    <div className="mv4-5 pv4 tc">
      <Headline className="f4 mv3 athelas">
        You have ventured into the unknown...
      </Headline>
      <div
        class="code f-6 light-purple o-10 nt4"
        style={{ transform: "scale(1.8, 4.2)" }}
      >
        404
      </div>
    </div>
  );
};

export default NotFound;
