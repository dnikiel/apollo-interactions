const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

// TODO: Create separate files for schema, resolvers, mocks and server.
// Add support for Typescript. Add nodemon for easier development.

// Schema definition
const typeDefs = gql`
  type Interaction {
    id: ID!
    "Interaction topic"
    topic: String!
    "Interaction start time"
    start_time: String!
    "User ID as an email"
    user_id: String!
  }

  type Query {
    interactions: [Interaction]
  }

  type Mutation {
    updateInteractionTopic(id: ID!, topic: String!): Interaction
    deleteInteraction(id: ID!): Interaction
  }
`;

// Mock interactions data
const interactions = [
  {
    id: "XncqVBJ6RP6qFkmYTfuMyg==",
    topic: "Sedric Meeting",
    start_time: "2020-02-16T11:18:55Z",
    user_id: "interview@sedric.me",
  },
  {
    id: "XncqVBJ6RP6qFkmYTfuMyk==",
    topic: "Another Meeting",
    start_time: "2020-02-16T13:00:00Z",
    user_id: "interview@sedric.me",
  },
  {
    id: "xcvxcvxcvxcv",
    topic: "Important Meeting",
    start_time: "2020-02-16T17:00:00Z",
    user_id: "interview@sedric.me",
  },
  {
    id: "sdfsdfsfsdfsdf",
    topic: "Standup Meeting",
    start_time: "2020-02-16T19:00:00Z",
    user_id: "interview@sedric.me",
  },
];

// Define resolvers returning mocked data
// TODO: Mutation response should contain additional fields: code, success, message
const resolvers = {
  Query: {
    interactions: () => interactions, // TODO: It may need pagination
  },
  Mutation: {
    updateInteractionTopic: (_parent, args) => ({ ...args }), // TODO: should return complete Interaction type
    deleteInteraction: (_parent, args) => ({ ...args }), // TODO: should return complete Interaction type
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  /**
   * Apollo Docs:
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// TODO: Port value as ENV variable
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
