import React, { Component } from "react";
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
      {votes.length}
      {` vote${votes.length % 10 === 1 ? "" : "s"}`}
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
    const isLoggedIn = !!this.context.userId;
    const { id: linkId, url, description, votes, ...metadata } = this.props;
    const voteByCurrentUser = votes.find(
      vote => vote.user.id === this.context.userId
    );
    const voteId = voteByCurrentUser ? voteByCurrentUser.id : null;
    return (
      <div className="mv3">
        {isLoggedIn && <UpvoteButton voteId={voteId} linkId={linkId} />}
        <LinkInfo votes={votes} {...metadata} />
        <Link url={url} description={description} />
      </div>
    );
  }
}

export default LinkListItem;
