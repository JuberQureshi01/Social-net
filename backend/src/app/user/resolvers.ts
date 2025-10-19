import { prismaClient } from "../../clients/db"; 
import UserService from "../../services/user";
import { GraphqlContext } from "../../types/interfaces";
import { User } from "@prisma/client";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const resultToken = await UserService.verifyGoogleAuthToken(token);
    return resultToken;
  },
  
  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    if (!ctx.user?.id) return null;
    return UserService.getUserById(ctx.user.id);
  },

  getUserById: async (
    parent: any,
    { id }: { id: string },
    ctx: GraphqlContext
  ) => {
    return UserService.getUserById(id);
  },
};

const mutations = {
  followUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("You must be logged in.");
    await UserService.followUser(ctx.user.id, to);
    return true;
  },
  unfollowUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("You must be logged in.");
    await UserService.unfollowUser(ctx.user.id, to);
    return true;
  },
};

const extraResolvers = {
  User: {

    tweets: (parent: User) =>
      prismaClient.tweet.findMany({ 
        where: { authorId: parent.id },
        orderBy: { createdAt: "desc" } 
      }),

    followers: async (parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { followingId: parent.id },
        include: { follower: true },
      });
      return result.map((el) => el.follower);
    },

    following: async (parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { followerId: parent.id },
        include: { following: true },
      });
      return result.map((el) => el.following);
    },

    comments: (parent: User) =>
      prismaClient.comment.findMany({
        where: { authorId: parent.id },
        include: {
          tweet: true,
        },
        orderBy: { createdAt: "desc" },
      }),

    likes: (parent: User) =>
      prismaClient.like.findMany({
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

export const resolvers = { queries, mutations, extraResolvers };