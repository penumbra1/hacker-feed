import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
        }
      }
    }
  }
`;

const UpvoteButton = ({ id }) => (
  <Mutation mutation={VOTE_MUTATION} variables={{ linkId: id }}>
    {voteMutation => (
      <button
        className="link f5 pl0 pr1 bn bg-transparent moon-gray hover-black pointer"
        aria-label="Upvote"
        onClick={voteMutation}
      >
        <span aria-hidden>▲</span>
      </button>
    )}
  </Mutation>
);

export default UpvoteButton;
