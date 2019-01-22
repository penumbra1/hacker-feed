import React from "react";

const UpvoteButton = ({ isUpvoted, onClick }) => (
  <button
    className={`link f5 pl0 pr1 bn bg-transparent hover-black pointer ${
      isUpvoted ? "light-purple" : "moon-gray"
    }`}
    aria-label={isUpvoted ? "Remove upvote" : "Upvote"}
    onClick={onClick}
  >
    <span aria-hidden>▲</span>
  </button>
);

export default UpvoteButton;
