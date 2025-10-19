"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../clients/db");
const extraResolvers = {
    Like: {
        user: (parent) => db_1.prismaClient.user.findUnique({ where: { id: parent.userId } }),
        tweet: (parent) => db_1.prismaClient.tweet.findUnique({ where: { id: parent.tweetId } }),
    },
};
exports.resolvers = { extraResolvers };
