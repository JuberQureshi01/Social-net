export interface GraphqlContext {
    user?: {
        id: string;
        email: string;
    };
}

export interface CreateTweetPayload {
    content: string;
    imageURL?: string;
}

export interface CreateCommentPayload {
    content: string;
    tweetId: string;
    parentId?: string;
}
