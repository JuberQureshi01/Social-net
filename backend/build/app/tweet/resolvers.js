"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../clients/db");
const tweet_1 = __importDefault(require("../../services/tweet"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const queries = {
    getAllTweets: (parent, { skip, take }) => tweet_1.default.getAllTweets(skip, take),
    getTweetById: (parent, { id }) => tweet_1.default.getTweetById(id),
    getSignedURLForTweetImage: async (parent, { imageName, imageType }, ctx) => {
        if (!ctx.user || !ctx.user.id)
            throw new Error("Unauthenticated");
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        if (!cloudName || !apiKey)
            throw new Error("Cloudinary credentials not configured.");
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary_1.v2.utils.api_sign_request({
            public_id: imageName,
            timestamp: timestamp,
        }, process.env.CLOUDINARY_API_SECRET);
        return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?api_key=${apiKey}&public_id=${imageName}&signature=${signature}&timestamp=${timestamp}`;
    }
};
const mutations = {
    createTweet: async (parent, { payload }, ctx) => {
        return await tweet_1.default.createTweet(payload, ctx);
    },
    likeTweet: async (parent, { id }, ctx) => {
        if (!ctx.user?.id)
            throw new Error("You must be logged in.");
        return tweet_1.default.likeTweet(ctx.user.id, id);
    },
    unlikeTweet: async (parent, { id }, ctx) => {
        if (!ctx.user?.id)
            throw new Error("You must be logged in.");
        return tweet_1.default.unlikeTweet(ctx.user.id, id);
    },
};
const extraResolvers = {
    Tweet: {
        author: (parent) => db_1.prismaClient.user.findUnique({ where: { id: parent.authorId } }),
        likes: async (parent) => {
            const result = await db_1.prismaClient.like.findMany({
                where: { tweetId: parent.id },
                include: { user: true },
            });
            return result.map(el => el.user);
        },
        comments: (parent) => db_1.prismaClient.comment.findMany({ where: { tweetId: parent.id } }),
    },
};
exports.resolvers = { mutations, queries, extraResolvers };
