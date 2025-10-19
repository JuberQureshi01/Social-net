export const mutations = `#graphql
    createTweet(payload: CreateTweetData!): Tweet
    likeTweet(id: ID!): Boolean
    unlikeTweet(id: ID!): Boolean
`;
