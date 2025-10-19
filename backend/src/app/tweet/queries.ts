export const queries = `#graphql
    getAllTweets(skip: Int, take: Int): [Tweet]
    getTweetById(id: ID!): Tweet
    getSignedURLForTweetImage(imageName: String!, imageType: String!): String
`;
