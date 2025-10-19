import { gql } from "graphql-request";

export const createCommentMutation = gql`
  mutation CreateComment($payload: CreateCommentData!) {
    createComment(payload: $payload) {
      id
    }
  }
`;
