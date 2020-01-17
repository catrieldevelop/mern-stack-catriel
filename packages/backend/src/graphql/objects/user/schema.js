import Base from '../../types/base';
 
const User = `  
extend type Query {  
   sayHello(name: String!): String
}
extend type Mutation { 
    mutHello(name: String!): String
}
 
`;

export default () => [User, Base ];

