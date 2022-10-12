import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";

import { updateId } from "../activeInteractionSlice";
import { formatDate } from "../utils";

import type { ActiveInteractionState, Interaction } from "../types";

type Props = {
  activeInteraction: ActiveInteractionState["value"];
  interaction: Interaction;
};

// Render accordion with details of single interaction
const InteractionAccordion = ({
  activeInteraction,
  interaction: { id, topic, start_time, user_id },
}: Props) => {
  const dispatch = useDispatch();

  const handleChange = (id: Interaction["id"]) => () => {
    // Update activeInteraction
    dispatch(updateId(activeInteraction === id ? null : id));
  };

  return (
    <Accordion expanded={activeInteraction === id} onChange={handleChange(id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ color: "text.secondary" }}>{topic}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Start time: {formatDate(start_time)}</Typography>
        <Typography>User ID: {user_id}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default InteractionAccordion;
