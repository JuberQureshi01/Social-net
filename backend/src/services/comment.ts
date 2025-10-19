import { prismaClient } from "../clients/db";
import { CreateCommentPayload, GraphqlContext } from "../types/interfaces";

class CommentService {
    public static async createComment(payload: CreateCommentPayload, ctx: GraphqlContext) {
        if (!ctx.user) throw new Error("You must be logged in to comment.");

        return prismaClient.comment.create({
            data: {
                content: payload.content,
                author: { connect: { id: ctx.user.id } },
                tweet: { connect: { id: payload.tweetId } },
                ...(payload.parentId && { parent: { connect: { id: payload.parentId } } }),
            },
        });
    }
}

export default CommentService;
