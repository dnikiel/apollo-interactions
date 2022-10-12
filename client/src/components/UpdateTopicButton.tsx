import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";

import { UPDATE_INTERACTION_TOPIC } from "../mutations";

import type { Interaction, ActiveInteractionState } from "../types";

type Props = {
  activeInteraction: ActiveInteractionState["value"];
};

// Render button which updates topic of active interaction.
// For now only with mocked topic text.
const UpdateTopicButton = ({ activeInteraction }: Props) => {
  // TODO: Handle loading and error state, use toastify
  const [updateInteractionTopic, { loading, error }] = useMutation(
    UPDATE_INTERACTION_TOPIC
  );

  const handleUpdateTopic = (topic: Interaction["topic"]) => () => {
    // Trigger update mutation if we have activeInteraction
    !!activeInteraction &&
      !loading &&
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
    <Button onClick={handleUpdateTopic("My updated topic")}>
      Update topic
    </Button>
  );
};

export default UpdateTopicButton;
