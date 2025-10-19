"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../clients/db");
const comment_1 = __importDefault(require("../../services/comment"));
const mutations = {
    createComment: (parent, { payload }, ctx) => {
        return comment_1.default.createComment(payload, ctx);
    },
};
const extraResolvers = {
    Comment: {
        author: (parent) => db_1.prismaClient.user.findUnique({ where: { id: parent.authorId } }),
        parent: (parent) => parent.parentId ? db_1.prismaClient.comment.findUnique({ where: { id: parent.parentId } }) : null,
        replies: (parent) => db_1.prismaClient.comment.findMany({ where: { parentId: parent.id } }),
    },
};
exports.resolvers = { mutations, extraResolvers };
