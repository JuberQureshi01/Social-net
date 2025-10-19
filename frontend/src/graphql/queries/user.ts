import { gql } from "graphql-request";

export const verifyUserGoogleTokenQuery = gql`
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`;

export const getCurrentUserQuery = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageUrl
      email
      firstName
      lastName
      followers {
        id
        firstName
        profileImageUrl
      }
      following {
        id
        firstName
        profileImageUrl
      }
    }
  }
`;

export const getUserByIdQuery = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      email
      profileImageUrl
      followers {
        id
      }
      following {
        id
      }
      tweets {
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
      comments {
        id
        content
        author {
          id
          firstName
          lastName
          profileImageUrl
        }
        tweet {
          id
        }
      }
      likes {
        id
        tweet {
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
    }
  }
`;