import { Tweet } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import TweetService from "../../services/tweet";
import { CreateTweetPayload, GraphqlContext } from "../../types/interfaces";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const queries = {
    getAllTweets: (parent: any, { skip, take }: { skip?: number, take?: number }) =>
        TweetService.getAllTweets(skip, take),
    getTweetById: (parent: any, { id }: { id: string }) => TweetService.getTweetById(id),
    getSignedURLForTweetImage: async (parent: any, { imageName, imageType }: { imageName: string, imageType: string }, ctx: GraphqlContext) => {
        if (!ctx.user || !ctx.user.id) throw new Error("Unauthenticated");

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;

        if (!cloudName || !apiKey) throw new Error("Cloudinary credentials not configured.");

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            {
                public_id: imageName,
                timestamp: timestamp,
            },
            process.env.CLOUDINARY_API_SECRET as string
        );

        return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?api_key=${apiKey}&public_id=${imageName}&signature=${signature}&timestamp=${timestamp}`;
    }
};

const mutations = {
    createTweet: async (parent: any, { payload }: { payload: CreateTweetPayload }, ctx: GraphqlContext) => {
        return await TweetService.createTweet(payload, ctx);
    },
    likeTweet: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => {
        if (!ctx.user?.id) throw new Error("You must be logged in.");
        return TweetService.likeTweet(ctx.user.id, id);
    },
    unlikeTweet: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => {
        if (!ctx.user?.id) throw new Error("You must be logged in.");
        return TweetService.unlikeTweet(ctx.user.id, id);
    },
};

const extraResolvers = {
    Tweet: {
        author: (parent: Tweet) => prismaClient.user.findUnique({ where: { id: parent.authorId } }),
        likes: async (parent: Tweet) => {
            const result = await prismaClient.like.findMany({
                where: { tweetId: parent.id },
                include: { user: true },
            });
            return result.map(el => el.user);
        },
        comments: (parent: Tweet) => prismaClient.comment.findMany({ where: { tweetId: parent.id } }),
    },
};

export const resolvers = { mutations, queries, extraResolvers };
