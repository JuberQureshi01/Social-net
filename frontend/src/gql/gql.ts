/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateComment($payload: CreateCommentData!) {\n    createComment(payload: $payload) {\n      id\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n": types.CreateTweetDocument,
    "\n  mutation LikeTweet($id: ID!) {\n    likeTweet(id: $id)\n  }\n": types.LikeTweetDocument,
    "\n  mutation UnlikeTweet($id: ID!) {\n    unlikeTweet(id: $id)\n  }\n": types.UnlikeTweetDocument,
    "\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserDocument,
    "\n  query GetAllTweets($skip: Int, $take: Int) {\n    getAllTweets(skip: $skip, take: $take) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      likes {\n        id\n      }\n      comments {\n        id\n      }\n    }\n  }\n": types.GetAllTweetsDocument,
    "\n  query GetTweetById($id: ID!) {\n    getTweetById(id: $id) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      comments {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n      likes {\n        id\n      }\n    }\n  }\n": types.GetTweetByIdDocument,
    "\n    query GetSignedURL($imageName: String!, $imageType: String!) {\n        getSignedURLForTweetImage(imageName: $imageName, imageType: $imageType)\n    }\n": types.GetSignedUrlDocument,
    "\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.VerifyUserGoogleTokenDocument,
    "\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        id\n        firstName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        profileImageUrl\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  query GetUserById($id: ID!) {\n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      email\n      profileImageUrl\n      followers {\n        id\n      }\n      following {\n        id\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n        likes {\n          id\n        }\n        comments {\n          id\n        }\n      }\n      comments {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n        tweet {\n          id\n        }\n      }\n      likes {\n        id\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageUrl\n          }\n          likes {\n            id\n          }\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComment($payload: CreateCommentData!) {\n    createComment(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($payload: CreateCommentData!) {\n    createComment(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeTweet($id: ID!) {\n    likeTweet(id: $id)\n  }\n"): (typeof documents)["\n  mutation LikeTweet($id: ID!) {\n    likeTweet(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnlikeTweet($id: ID!) {\n    unlikeTweet(id: $id)\n  }\n"): (typeof documents)["\n  mutation UnlikeTweet($id: ID!) {\n    unlikeTweet(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTweets($skip: Int, $take: Int) {\n    getAllTweets(skip: $skip, take: $take) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      likes {\n        id\n      }\n      comments {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllTweets($skip: Int, $take: Int) {\n    getAllTweets(skip: $skip, take: $take) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      likes {\n        id\n      }\n      comments {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTweetById($id: ID!) {\n    getTweetById(id: $id) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      comments {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n      likes {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTweetById($id: ID!) {\n    getTweetById(id: $id) {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      comments {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n      likes {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetSignedURL($imageName: String!, $imageType: String!) {\n        getSignedURLForTweetImage(imageName: $imageName, imageType: $imageType)\n    }\n"): (typeof documents)["\n    query GetSignedURL($imageName: String!, $imageType: String!) {\n        getSignedURLForTweetImage(imageName: $imageName, imageType: $imageType)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        id\n        firstName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        profileImageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        id\n        firstName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        profileImageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($id: ID!) {\n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      email\n      profileImageUrl\n      followers {\n        id\n      }\n      following {\n        id\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n        likes {\n          id\n        }\n        comments {\n          id\n        }\n      }\n      comments {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n        tweet {\n          id\n        }\n      }\n      likes {\n        id\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageUrl\n          }\n          likes {\n            id\n          }\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($id: ID!) {\n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      email\n      profileImageUrl\n      followers {\n        id\n      }\n      following {\n        id\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n        likes {\n          id\n        }\n        comments {\n          id\n        }\n      }\n      comments {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n        tweet {\n          id\n        }\n      }\n      likes {\n        id\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageUrl\n          }\n          likes {\n            id\n          }\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;