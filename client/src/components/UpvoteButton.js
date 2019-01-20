import React, { Component } from "react";
import { FEED_QUERY, VOTE_MUTATION, UNVOTE_MUTATION } from "../graphql";
import { Mutation } from "react-apollo";

const UpvoteButton = ({ voteId, linkId }) => (
  <Mutation
    mutation={voteId ? UNVOTE_MUTATION : VOTE_MUTATION}
    variables={{ linkId }}
    context={{ debounceKey: 1 }}
  >
    {voteMutation => (
      <button
        className={`link f5 pl0 pr1 bn bg-transparent hover-black pointer ${
          voteId ? "light-purple" : "moon-gray"
        }`}
        aria-label={voteId ? "Remove upvote" : "Upvote"}
        onClick={voteMutation}
      >
        <span aria-hidden>▲</span>
      </button>
    )}
  </Mutation>
);

export default UpvoteButton;
