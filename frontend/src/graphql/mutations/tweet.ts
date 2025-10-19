import { gql } from "graphql-request";

export const createTweetMutation = gql`
  mutation CreateTweet($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
      id
    }
  }
`;

export const likeTweetMutation = gql`
  mutation LikeTweet($id: ID!) {
    likeTweet(id: $id)
  }
`;

export const unlikeTweetMutation = gql`
  mutation UnlikeTweet($id: ID!) {
    unlikeTweet(id: $id)
  }
`;
