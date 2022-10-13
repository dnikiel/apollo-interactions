import { ApolloClient, InMemoryCache } from "@apollo/client";

// Instance of Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          interactions: {
            merge: false,
          },
        },
      },
    },
  }),
});

export default client;
