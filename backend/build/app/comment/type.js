"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
    input CreateCommentData {
        content: String!
        tweetId: ID!
        parentId: ID
    }

    type Comment {
        id: ID!
        content: String!
        author: User
        replies: [Comment]
        parent: Comment
        tweet:Tweet
    }
`;
