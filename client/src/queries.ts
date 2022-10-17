import { gql } from "@apollo/client";

const GET_INTERACTIONS = gql`
  query GetInteractions {
    interactions {
      id
      topic
    }
  }
`;

const GET_INTERACTION = gql`
  query GetInteraction($id: ID!) {
    interaction(id: $id) {
      id
      topic
      start_time
      user_id
    }
  }
`;

export { GET_INTERACTIONS, GET_INTERACTION };
