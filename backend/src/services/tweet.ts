import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis/index";
import { CreateTweetPayload, GraphqlContext } from "../types/interfaces";

class TweetService {
public static async getAllTweets(skip = 0, take = 10) {
  const tweets = await prismaClient.tweet.findMany({
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

    public static async getTweetById(id: string) {
        return prismaClient.tweet.findUnique({ where: { id } });
    }

    public static async createTweet(payload: CreateTweetPayload, ctx: GraphqlContext) {
        if (!ctx.user) throw new Error("You must be logged in to create a tweet.");

        const tweet = await prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: { connect: { id: ctx.user.id } },
            }
        });
        return tweet;
    }

    public static async likeTweet(userId: string, tweetId: string) {
        await prismaClient.like.create({
            data: {
                user: { connect: { id: userId } },
                tweet: { connect: { id: tweetId } },
            }
        });
        return true;
    }

    public static async unlikeTweet(userId: string, tweetId: string) {
        await prismaClient.like.delete({
            where: { userId_tweetId: { userId, tweetId } },
        });
        return true;
    }
}

export default TweetService;
