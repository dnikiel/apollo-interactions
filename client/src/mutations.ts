import { gql } from "@apollo/client";

const UPDATE_INTERACTION_TOPIC = gql`
  mutation UpdateInteractionTopic($id: ID!, $topic: String!) {
    updateInteractionTopic(id: $id, topic: $topic) {
      id
      topic
    }
  }
`;

const DELETE_INTERACTION = gql`
  mutation DeleteInteraction($id: ID!) {
    deleteInteraction(id: $id) {
      id
    }
  }
`;

export { UPDATE_INTERACTION_TOPIC, DELETE_INTERACTION };
