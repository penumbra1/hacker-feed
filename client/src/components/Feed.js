import React from "react";
import { Query } from "react-apollo";
import {
  FEED_QUERY,
  NEW_LINK_SUBSCRIPTION,
  REMOVED_LINK_SUBSCRIPTION,
  UPDATED_LINK_SUBSCRIPTION
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
            subscribeToCreatesAndDeletes={() => {
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
            subscribeToUpdates={linkId =>
              subscribeToMore({
                document: UPDATED_LINK_SUBSCRIPTION,
                variables: { linkId },
                updateQuery: (prev, { subscriptionData: { data } }) => {
                  console.log("updated", data);
                  if (!data) return prev;
                  const { updatedLink } = data;
                  return {
                    ...prev,
                    feed: {
                      ...prev.feed,
                      links: prev.feed.links.reduce((links, link) => {
                        if (link.id === updatedLink.id)
                          // updatedLink doesn't contain relation fields, hence  ...link
                          links.push({ ...link, updatedLink });
                        else links.push(link);
                        return links;
                      }, [])
                    }
                  };
                }
              })
            }
          />
        );
      }}
    </Query>
  );
};

export default Feed;
