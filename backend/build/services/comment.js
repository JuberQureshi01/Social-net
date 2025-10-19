"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../clients/db");
class CommentService {
    static async createComment(payload, ctx) {
        if (!ctx.user)
            throw new Error("You must be logged in to comment.");
        return db_1.prismaClient.comment.create({
            data: {
                content: payload.content,
                author: { connect: { id: ctx.user.id } },
                tweet: { connect: { id: payload.tweetId } },
                ...(payload.parentId && { parent: { connect: { id: payload.parentId } } }),
            },
        });
    }
}
exports.default = CommentService;
