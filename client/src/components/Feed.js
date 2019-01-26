import React from "react";
import { Query } from "react-apollo";
import {
  FEED_QUERY,
  NEW_LINK_SUBSCRIPTION,
  REMOVED_LINK_SUBSCRIPTION
} from "../graphql";
import LinkList from "./LinkList";

const Feed = ({ variables = {} }) => {
  return (
    <Query
      query={FEED_QUERY}
      variables={variables}
      // fetchPolicy="cache-and-network"
    >
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <div>Fetching data...</div>;
        if (error) {
          console.error(error);
          return <div>Something went wrong.</div>;
        }

        return (
          <LinkList
            links={data.feed.links}
            subscribe={() => {
              subscribeToMore({
                document: NEW_LINK_SUBSCRIPTION,
                variables,
                updateQuery: (prev, { subscriptionData: { data } }) => {
                  console.log("added", data);
                  if (!data) return prev;
                  const { postedLink } = data;
                  return {
                    ...prev,
                    feed: {
                      links: [...prev.feed.links, postedLink],
                      count: prev.feed.links.length + 1,
                      __typename: prev.feed.__typename
                    }
                  };
                }
              });
              subscribeToMore({
                document: REMOVED_LINK_SUBSCRIPTION,
                variables,
                updateQuery: (prev, { subscriptionData: { data } }) => {
                  console.log("removed", data);
                  if (!data) return prev;
                  const { removedLink } = data;
                  return {
                    ...prev,
                    feed: {
                      // ...prev.feed,
                      links: prev.feed.links.filter(
                        ({ id }) => id !== removedLink.id
                      ),
                      count: prev.feed.links.length - 1,
                      __typename: prev.feed.__typename
                    }
                  };
                }
              });
            }}
          />
        );
      }}
    </Query>
  );
};

export default Feed;
