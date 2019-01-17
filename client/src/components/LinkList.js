import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Link from "./Link";

const FEED_QUERY = gql`
  query getFeed {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const LinkList = props => {
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching data...</div>;
        if (error) {
          console.error(error);
          return <div>Something went wrong.</div>;
        }

        const linksToRender = data.feed.links;

        return (
          <div className="mv3 mv4-ns">
            {linksToRender.length > 1
              ? linksToRender.map(link => <Link key={link.id} link={link} />)
              : "Nothing here yet..."}
          </div>
        );
      }}
    </Query>
  );
};

export default LinkList;
