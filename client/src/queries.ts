import { gql } from "@apollo/client";

const GET_INTERACTIONS = gql`
  query GetInteractions {
    interactions {
      id
      topic
      start_time
      user_id
    }
  }
`;

export { GET_INTERACTIONS };
