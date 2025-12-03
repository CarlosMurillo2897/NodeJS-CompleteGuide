// const { buildSchema } = require('graphql');

// module.exports = buildSchema(`
//     type TestData {
//         text: String!
//         views: Int!
//     }

//     type RootQuery {
//         hello: TestData!
//     }

//     schema {
//         query: RootQuery
//     }
// `);
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
module.exports.schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      text: {
        type: GraphQLString,
        resolve: () => 'world',
      },
      views: {
        type: GraphQLString,
        resolve: () => 1234
      },
    },
  }),
});