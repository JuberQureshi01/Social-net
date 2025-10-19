import {  prismaClient } from "../../clients/db";
import { Like } from "@prisma/client";

const extraResolvers = {
  Like: {
    user: (parent: Like) =>
      prismaClient.user.findUnique({ where: { id: parent.userId } }),
    
    tweet: (parent: Like) =>
      prismaClient.tweet.findUnique({ where: { id: parent.tweetId } }),
  },
};

export const resolvers = { extraResolvers };
