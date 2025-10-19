import { gql } from "graphql-request";

export const followUserMutation = gql`
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`;

export const unfollowUserMutation = gql`
  mutation UnfollowUser($to: ID!) {
    unfollowUser(to: $to)
  }
`;
