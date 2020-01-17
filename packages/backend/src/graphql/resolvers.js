import Date from './objects/scalar/Date';
import { Query as UserQuery, Mutation as UserMutation } from './objects/user/resolvers';

export default {
    Query: {
        ...UserQuery,    
        
    },
    Mutation: { 
        ...UserMutation,
    },  
    Date, 
};