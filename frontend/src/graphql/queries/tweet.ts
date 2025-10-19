import { gql } from "graphql-request";

export const getAllTweetsQuery = gql`
  query GetAllTweets($skip: Int, $take: Int) {
    getAllTweets(skip: $skip, take: $take) {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profileImageUrl
      }
      likes {
        id
      }
      comments {
        id
      }
    }
  }
`;

export const getTweetByIdQuery = gql`
  query GetTweetById($id: ID!) {
    getTweetById(id: $id) {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profileImageUrl
      }
      comments {
        id
        content
        author {
          id
          firstName
          lastName
          profileImageUrl
        }
      }
      likes {
        id
      }
    }
  }
`;

export const getSignedURLForTweetImageQuery = gql`
    query GetSignedURL($imageName: String!, $imageType: String!) {
        getSignedURLForTweetImage(imageName: $imageName, imageType: $imageType)
    }
`;
