import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import { DELETE_INTERACTION } from "../mutations";
import { GET_INTERACTIONS } from "../queries";
import { updateId } from "../activeInteractionSlice";

import type { Interaction, RootState } from "../types";

type CachedInteractions = {
  interactions: [Interaction];
} | null;

// Render button which deletes active interaction
const DeleteInteractionButton = () => {
  const activeInteraction = useSelector(
    (state: RootState) => state.activeInteraction.value
  );
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
        // Reset activeInteraction
        dispatch(updateId(null));
      },
    }
  );

  const handleDeleteInteraction = () => {
    // Trigger delete mutation if we have activeInteraction
    deleteInteraction({
      variables: { id: activeInteraction },
      optimisticResponse: {
        deleteInteraction: {
          id: activeInteraction,
          __typename: "Interaction",
        },
      },
    }).catch(() => {
      // TODO: Handle error

      // Reset activeInteraction to state before an error
      dispatch(updateId(activeInteraction));
    });
  };

  return (
    <Button
      startIcon={<DeleteIcon />}
      onClick={handleDeleteInteraction}
      disabled={loading}
    >
      Delete interaction
    </Button>
  );
};

export default DeleteInteractionButton;
