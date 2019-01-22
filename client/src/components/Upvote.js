import React from "react";
import { Mutation } from "react-apollo";
import { VOTE_MUTATION, UNVOTE_MUTATION } from "../graphql";
import UpvoteButton from "./UpvoteButton";

const Upvote = ({ linkId, userId, votes }) => {
  const isUpvoted = votes.find(vote => vote.user.id === userId);
  return (
    <Mutation
      mutation={isUpvoted ? UNVOTE_MUTATION : VOTE_MUTATION}
      context={{ debounceKey: 1 }}
    >
      {voteMutation => (
        <UpvoteButton
          isUpvoted={isUpvoted}
          onClick={() =>
            voteMutation({
              variables: { linkId },
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
            })
          }
        />
      )}
    </Mutation>
  );
};

export default Upvote;
