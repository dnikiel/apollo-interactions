import { Box, ButtonGroup, Card, Typography } from "@mui/material";

import { formatDate } from "../utils";

import type { Interaction, RootState } from "../types";
import { GET_INTERACTION } from "../queries";
import { useQuery } from "@apollo/client";
import UpdateTopicButton from "./UpdateTopicButton";
import DeleteInteractionButton from "./DeleteInteractionButton";
import { useSelector } from "react-redux";

type InteractionData = {
  interaction: Interaction;
};

// Render accordion with details of single interaction
const InteractionDetails = () => {
  const activeInteraction = useSelector(
    (state: RootState) => state.activeInteraction.value
  );
  const { loading, error, data } = useQuery<InteractionData>(GET_INTERACTION, {
    skip: !activeInteraction,
    variables: {
      id: activeInteraction,
    },
  });

  return (
    <Card
      sx={{
        padding: "25px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!activeInteraction && (
        <Typography>Select an interaction to learn more</Typography>
      )}
      {loading && <Typography>loading...</Typography>}
      {error && <Typography>{error.message}</Typography>}
      {data && (
        <Box>
          <Typography>
            <strong>Topic:</strong> {data.interaction.topic}
          </Typography>
          <Typography>
            <strong>Start time:</strong>{" "}
            {formatDate(data.interaction.start_time)}
          </Typography>
          <Typography>
            <strong>User ID:</strong> {data.interaction.user_id}
          </Typography>
          <ButtonGroup sx={{ marginTop: "25px" }} variant="contained">
            <UpdateTopicButton />
            <DeleteInteractionButton />
          </ButtonGroup>
        </Box>
      )}
    </Card>
  );
};

export default InteractionDetails;
