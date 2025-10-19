import { Comment } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import CommentService from "../../services/comment";
import { CreateCommentPayload, GraphqlContext } from "../../types/interfaces";

const mutations = {
    createComment: (parent: any, { payload }: { payload: CreateCommentPayload }, ctx: GraphqlContext) => {
        return CommentService.createComment(payload, ctx);
    },
};

const extraResolvers = {
    Comment: {
        author: (parent: Comment) => prismaClient.user.findUnique({ where: { id: parent.authorId } }),
        parent: (parent: Comment) => parent.parentId ? prismaClient.comment.findUnique({ where: { id: parent.parentId } }) : null,
        replies: (parent: Comment) => prismaClient.comment.findMany({ where: { parentId: parent.id } }),
    },
};

export const resolvers = { mutations, extraResolvers };
