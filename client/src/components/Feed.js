import React from "react";
import { Query } from "react-apollo";
import LinkList from "./LinkList";

const Feed = ({ ...queryProps }) => {
  return (
    <Query {...queryProps}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching data...</div>;
        if (error) {
          console.error(error);
          return <div>Something went wrong.</div>;
        }

        return <LinkList links={data.feed.links} />;
      }}
    </Query>
  );
};

export default Feed;
