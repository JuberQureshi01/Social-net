import { User } from './user';
import { Tweets } from './tweet';
import { Comments } from './comment'; 
import { Like } from './like';

// Combine all the components from different modules
const mergedTypeDefs = `
    ${User.types}
    ${Tweets.types}
    ${Comments.types} 
    ${Like.type}

    type Query {
        ${User.queries}
        ${Tweets.queries}
        ${Comments.queries}
    }

    type Mutation {
        ${User.mutations}
        ${Tweets.mutations}
        ${Comments.mutations}
    }
`;

const mergedResolvers = {
    Query: {
        ...User.resolvers.queries,
        ...Tweets.resolvers.queries,
    },
    Mutation: {
        ...User.resolvers.mutations,
        ...Tweets.resolvers.mutations,
        ...Comments.resolvers.mutations,
    },
    ...User.resolvers.extraResolvers,
    ...Tweets.resolvers.extraResolvers,
    ...Comments.resolvers.extraResolvers,
    ...Like.resolvers.extraResolvers,
};

export const App = {
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
};
