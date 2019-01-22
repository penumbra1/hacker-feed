import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { VOTE_MUTATION, UNVOTE_MUTATION } from "../graphql";
import { AuthContext } from "../auth";
import { timeDifferenceForDate } from "../utils";
import UpvoteButton from "./UpvoteButton";
import Upvote from "./Upvote";

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

  render() {
    const { userId } = this.context;
    const { id: linkId, url, description, votes, ...metadata } = this.props;

    return (
      <div className="mb3">
        {userId && <Upvote {...{ linkId, userId, votes }} />}
        <LinkInfo votes={votes.length} {...metadata} />
        <Link url={url} description={description} />
      </div>
    );
  }
}

export default LinkListItem;
