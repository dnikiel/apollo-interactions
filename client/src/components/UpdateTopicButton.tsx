import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

import { UPDATE_INTERACTION_TOPIC } from "../mutations";

import type { Interaction, RootState } from "../types";

// Render button which updates topic of active interaction.
// For now only with mocked topic text.
const UpdateTopicButton = () => {
  const activeInteraction = useSelector(
    (state: RootState) => state.activeInteraction.value
  );
  // TODO: Handle loading and error state, use toastify
  const [updateInteractionTopic, { loading, error }] = useMutation(
    UPDATE_INTERACTION_TOPIC
  );

  const handleUpdateTopic = (topic: Interaction["topic"]) => () => {
    // Trigger update mutation if we have activeInteraction
    updateInteractionTopic({
      variables: { id: activeInteraction, topic },
      optimisticResponse: {
        updateInteractionTopic: {
          id: activeInteraction,
          __typename: "Interaction",
          topic,
        },
      },
    }).catch(() => {
      // TODO: Handle error
    });
  };

  return (
    <Button onClick={handleUpdateTopic("My updated topic")} disabled={loading}>
      Update topic
    </Button>
  );
};

export default UpdateTopicButton;
