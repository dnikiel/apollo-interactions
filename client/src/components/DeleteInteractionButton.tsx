import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { DELETE_INTERACTION } from "../mutations";
import { GET_INTERACTIONS } from "../queries";
import { updateId } from "../activeInteractionSlice";

import type { Interaction, ActiveInteractionState } from "../types";

type Props = {
  activeInteraction: ActiveInteractionState["value"];
};

type CachedInteractions = {
  interactions: [Interaction];
} | null;

// Render button which deletes active interaction
const DeleteInteractionButton = ({ activeInteraction }: Props) => {
  const dispatch = useDispatch();

  // TODO: Handle loading and error state, use toastify
  const [deleteInteraction, { loading, error }] = useMutation(
    DELETE_INTERACTION,
    {
      update(cache, { data: { deleteInteraction } }) {
        const existingInteractions: CachedInteractions = cache.readQuery({
          query: GET_INTERACTIONS,
        });
        const newInteractions = existingInteractions!.interactions.filter(
          (interaction: Interaction) => interaction.id !== deleteInteraction.id
        );
        cache.writeQuery({
          query: GET_INTERACTIONS,
          data: { interactions: newInteractions },
        });
      },
    }
  );

  const handleDeleteInteraction = () => {
    // Trigger delete mutation if we have activeInteraction
    !!activeInteraction &&
      !loading &&
      deleteInteraction({
        variables: { id: activeInteraction },
        optimisticResponse: {
          deleteInteraction: {
            id: activeInteraction,
            __typename: "Interaction",
          },
        },
      })
        .then(() => {
          // Reset activeInteraction
          dispatch(updateId(null));
        })
        .catch(() => {
          // TODO: Handle error
        });
  };

  return <Button onClick={handleDeleteInteraction}>Delete interaction</Button>;
};

export default DeleteInteractionButton;
