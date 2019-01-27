import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { VOTE_MUTATION, UNVOTE_MUTATION } from "../graphql";
import UpvoteButton from "./UpvoteButton";

class Upvote extends Component {
  handleVote = (mutation, isUpvoted) => {
    const { linkId, userId, votes } = this.props;
    mutation({
      variables: {
        linkId
      },
      optimisticResponse: {
        __typename: "Mutation",
        [isUpvoted ? "unvote" : "vote"]: {
          __typename: "Link",
          id: linkId,
          votes: isUpvoted
            ? votes.filter(vote => vote.user.id !== userId)
            : [
                ...votes,
                {
                  __typename: "Vote",
                  id: userId,
                  user: {
                    __typename: "User",
                    id: userId
                  }
                }
              ]
        }
      }
    });
  };

  render() {
    const isUpvoted = this.props.votes.find(
      vote => vote.user.id === this.props.userId
    );
    return (
      <Mutation
        mutation={isUpvoted ? UNVOTE_MUTATION : VOTE_MUTATION}
        context={{
          debounceKey: 1
        }}
      >
        {voteMutation => (
          <UpvoteButton
            isUpvoted={isUpvoted}
            onClick={() => this.handleVote(voteMutation, isUpvoted)}
          />
        )}
      </Mutation>
    );
  }
}

export default Upvote;
