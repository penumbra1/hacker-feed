import React from "react";
import { Query } from "react-apollo";
import {
  FEED_QUERY,
  NEW_LINK_SUBSCRIPTION,
  DELETED_LINK_SUBSCRIPTION
} from "../graphql";
import LinkList from "./LinkList";
// import LinkListItem from "./LinkListItem";

const Feed = ({ variables }) => {
  return (
    <Query query={FEED_QUERY} variables={variables}>
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
              console.log("Subbed");
              subscribeToMore({
                document: NEW_LINK_SUBSCRIPTION,
                variables,
                updateQuery: (prev, { subscriptionData }) => {
                  console.log("updating", subscriptionData);
                  if (!subscriptionData.data) return prev;
                  const newLink = subscriptionData.data.newLink;
                  return {
                    ...prev,
                    feed: {
                      links: [...prev.feed.links, newLink],
                      count: prev.feed.links.length + 1,
                      __typename: prev.feed.__typename
                    }
                  };
                }
              });
              subscribeToMore({
                document: DELETED_LINK_SUBSCRIPTION,
                variables,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  const { linkId } = subscriptionData.data.deletedLink;
                  return {
                    ...prev,
                    feed: {
                      links: prev.feed.links.filter(({ id }) => id !== linkId),
                      count: prev.feed.links.length - 1,
                      __typename: prev.feed.__typename
                    }
                  };
                }
              });
            }}
          />
        );
        // const { links } = data.feed;
        // return (
        //   <div>
        //     {links.length > 0
        //       ? links.map(link => <LinkListItem key={link.id} {...link} />)
        //       : "Nothing here yet..."}
        //   </div>
        // );
      }}
    </Query>
  );
};

export default Feed;
