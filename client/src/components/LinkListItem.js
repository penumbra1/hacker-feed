import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FEED_QUERY, VOTE_MUTATION, UNVOTE_MUTATION } from "../graphql";
import { AuthContext } from "../auth";
import { timeDifferenceForDate } from "../utils";
import UpvoteButton from "./UpvoteButton";

const Link = ({ url, description }) => (
  <>
    <h2 className="athelas f5 fw6 black mv1 measure-wide">{description}</h2>
    <a
      className="f6 db link code truncate gray no-underline pointer underline-hover"
      href={url}
    >
      {url}
    </a>
  </>
);

const Bar = () => (
  <span className="f5 mh2 moon-gray" aria-hidden>
    |
  </span>
);

const LinkInfo = ({ votes, postedBy, createdAt }) => (
  <div className="f6 gray dib">
    <span>
      {votes}
      {` vote${votes % 10 === 1 ? "" : "s"}`}
    </span>
    <Bar />
    <span>{`by ${postedBy.name || "anonymous"}`}</span>
    <Bar />
    <span>{`${timeDifferenceForDate(createdAt)}`}</span>
  </div>
);

class LinkListItem extends Component {
  static contextType = AuthContext;

  state = {
    isUpvoted: false
  };

  componentDidMount() {
    const voteByCurrentUser = this.props.votes.find(
      vote => vote.user.id === this.context.userId
    );
    this.setState({ isUpvoted: !!voteByCurrentUser });
  }

  render() {
    const isLoggedIn = !!this.context.userId;
    const { id: linkId, url, description, votes, ...metadata } = this.props;
    const { isUpvoted } = this.state;

    return (
      <Mutation
        mutation={isUpvoted ? UNVOTE_MUTATION : VOTE_MUTATION}
        variables={{ linkId }}
        context={{ debounceKey: 1 }}
        // optimisticResponse={{
        //           __typename: "Mutation",
        //           [isUpvoted ? "unvote" : "vote"]: {
        //              __typename: "Link",
        //             id: linkId,
        //             votes: votes.push({})
        //           }
        //         }}
      >
        {voteMutation => (
          <div className="mb3">
            {isLoggedIn && (
              <UpvoteButton isUpvoted={isUpvoted} onClick={voteMutation} />
            )}
            <LinkInfo votes={votes.length} {...metadata} />
            <Link url={url} description={description} />
          </div>
        )}
      </Mutation>
    );
  }
}

export default LinkListItem;
