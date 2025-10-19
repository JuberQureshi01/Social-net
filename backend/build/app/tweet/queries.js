"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    getAllTweets(skip: Int, take: Int): [Tweet]
    getTweetById(id: ID!): Tweet
    getSignedURLForTweetImage(imageName: String!, imageType: String!): String
`;
