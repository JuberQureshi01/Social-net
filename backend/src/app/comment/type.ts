export const types = `#graphql
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
