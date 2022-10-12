import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { GET_INTERACTIONS } from "../queries";
import InteractionAccordion from "./InteractionAccordion";
import UpdateTopicButton from "./UpdateTopicButton";
import DeleteInteractionButton from "./DeleteInteractionButton";
import "./App.css";

import type { Interaction, RootState } from "../types";

// TODO: Add unit and integration tests with
// jest and react-testing-library for all components.
// Consider fetching activeInteraction on component level
// instead of passing it in props.

// Render application container
const App = () => {
  const activeInteraction = useSelector(
    (state: RootState) => state.activeInteraction.value
  );
  const { loading, error, data } = useQuery(GET_INTERACTIONS);

  return (
    <Container maxWidth="md">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error.message}</Typography>}
      {data?.interactions.map((interaction: Interaction) => (
        <InteractionAccordion
          interaction={interaction}
          activeInteraction={activeInteraction}
          key={interaction.id}
        />
      ))}
      <UpdateTopicButton activeInteraction={activeInteraction} />
      <DeleteInteractionButton activeInteraction={activeInteraction} />
    </Container>
  );
};

export default App;
