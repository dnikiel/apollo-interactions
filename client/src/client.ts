import { ApolloClient, InMemoryCache } from "@apollo/client";

// Instance of Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default client;
