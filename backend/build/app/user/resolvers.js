"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../clients/db");
const user_1 = __importDefault(require("../../services/user"));
const queries = {
    verifyGoogleToken: async (parent, { token }) => {
        const resultToken = await user_1.default.verifyGoogleAuthToken(token);
        return resultToken;
    },
    getCurrentUser: async (parent, args, ctx) => {
        if (!ctx.user?.id)
            return null;
        return user_1.default.getUserById(ctx.user.id);
    },
    getUserById: async (parent, { id }, ctx) => {
        return user_1.default.getUserById(id);
    },
};
const mutations = {
    followUser: async (parent, { to }, ctx) => {
        if (!ctx.user || !ctx.user.id)
            throw new Error("You must be logged in.");
        await user_1.default.followUser(ctx.user.id, to);
        return true;
    },
    unfollowUser: async (parent, { to }, ctx) => {
        if (!ctx.user || !ctx.user.id)
            throw new Error("You must be logged in.");
        await user_1.default.unfollowUser(ctx.user.id, to);
        return true;
    },
};
const extraResolvers = {
    User: {
        tweets: (parent) => db_1.prismaClient.tweet.findMany({
            where: { authorId: parent.id },
            orderBy: { createdAt: "desc" }
        }),
        followers: async (parent) => {
            const result = await db_1.prismaClient.follows.findMany({
                where: { followingId: parent.id },
                include: { follower: true },
            });
            return result.map((el) => el.follower);
        },
        following: async (parent) => {
            const result = await db_1.prismaClient.follows.findMany({
                where: { followerId: parent.id },
                include: { following: true },
            });
            return result.map((el) => el.following);
        },
        comments: (parent) => db_1.prismaClient.comment.findMany({
            where: { authorId: parent.id },
            include: {
                tweet: true,
            },
            orderBy: { createdAt: "desc" },
        }),
        likes: (parent) => db_1.prismaClient.like.findMany({
            where: { userId: parent.id },
            include: {
                tweet: {
                    include: {
                        author: true,
                        likes: true,
                        comments: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        }),
    },
};
exports.resolvers = { queries, mutations, extraResolvers };
