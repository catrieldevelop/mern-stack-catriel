import { makeExecutableSchema } from 'graphql-tools';
import Base from './types/base';

//resolvers
import resolvers from './resolvers';

import User from './objects/user/schema';

export default makeExecutableSchema({
    typeDefs: [ Base, User ],
    resolvers,
    logger: { log: e => console.log(e) },
});