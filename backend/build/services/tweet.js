"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../clients/db");
class TweetService {
    static async getAllTweets(skip = 0, take = 10) {
        const tweets = await db_1.prismaClient.tweet.findMany({
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: {
                author: true,
                likes: { include: { user: true } },
                comments: true,
            },
        });
        return tweets;
    }
    static async getTweetById(id) {
        return db_1.prismaClient.tweet.findUnique({ where: { id } });
    }
    static async createTweet(payload, ctx) {
        if (!ctx.user)
            throw new Error("You must be logged in to create a tweet.");
        const tweet = await db_1.prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: { connect: { id: ctx.user.id } },
            }
        });
        return tweet;
    }
    static async likeTweet(userId, tweetId) {
        await db_1.prismaClient.like.create({
            data: {
                user: { connect: { id: userId } },
                tweet: { connect: { id: tweetId } },
            }
        });
        return true;
    }
    static async unlikeTweet(userId, tweetId) {
        await db_1.prismaClient.like.delete({
            where: { userId_tweetId: { userId, tweetId } },
        });
        return true;
    }
}
exports.default = TweetService;
