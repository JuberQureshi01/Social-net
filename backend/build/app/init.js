"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const user_1 = require("./user");
const tweet_1 = require("./tweet");
const comment_1 = require("./comment");
const like_1 = require("./like");
// Combine all the components from different modules
const mergedTypeDefs = `
    ${user_1.User.types}
    ${tweet_1.Tweets.types}
    ${comment_1.Comments.types} 
    ${like_1.Like.type}

    type Query {
        ${user_1.User.queries}
        ${tweet_1.Tweets.queries}
        ${comment_1.Comments.queries}
    }

    type Mutation {
        ${user_1.User.mutations}
        ${tweet_1.Tweets.mutations}
        ${comment_1.Comments.mutations}
    }
`;
const mergedResolvers = {
    Query: {
        ...user_1.User.resolvers.queries,
        ...tweet_1.Tweets.resolvers.queries,
    },
    Mutation: {
        ...user_1.User.resolvers.mutations,
        ...tweet_1.Tweets.resolvers.mutations,
        ...comment_1.Comments.resolvers.mutations,
    },
    ...user_1.User.resolvers.extraResolvers,
    ...tweet_1.Tweets.resolvers.extraResolvers,
    ...comment_1.Comments.resolvers.extraResolvers,
    ...like_1.Like.resolvers.extraResolvers,
};
exports.App = {
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
};
