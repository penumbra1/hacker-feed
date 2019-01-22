import gql from "graphql-tag";

export const USER_QUERY = gql`
  query getCurrentUser {
    currentUser {
      name
      id
    }
  }
`;

export const FEED_QUERY = gql`
  query getFeed {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      __typename
      id
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const UNVOTE_MUTATION = gql`
  mutation UnvoteMutation($linkId: ID!) {
    unvote(linkId: $linkId) {
      __typename
      id
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
