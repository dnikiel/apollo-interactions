import { ListItemButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { updateId } from "../activeInteractionSlice";

import type { Interaction, RootState } from "../types";

type Props = {
  interaction: Interaction;
};

// Render single interaction item
const InteractionItem = ({ interaction: { id, topic } }: Props) => {
  const activeInteraction = useSelector(
    (state: RootState) => state.activeInteraction.value
  );
  const dispatch = useDispatch();

  const handleChange = (id: Interaction["id"]) => () => {
    // Update activeInteraction
    dispatch(updateId(id));
  };

  return (
    <ListItemButton
      selected={activeInteraction === id}
      onClick={handleChange(id)}
    >
      <Typography sx={{ color: "text.secondary" }}>{topic}</Typography>
    </ListItemButton>
  );
};

export default InteractionItem;
