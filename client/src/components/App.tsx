import { Card, List, ListItem, Container, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";

import { GET_INTERACTIONS } from "../queries";
import InteractionItem from "./InteractionItem";
import InteractionDetails from "./InteractionDetails";
import styles from "./App.module.css";

import type { Interaction } from "../types";

// TODO: Add unit and integration tests with
// jest and react-testing-library for all components.

// Render application container
const App = () => {
  const { loading, error, data } = useQuery(GET_INTERACTIONS);

  return (
    <Container maxWidth="lg">
      <div className={styles.container}>
        <div className={styles.list}>
          <Card
            sx={{
              height: "200px",
            }}
          >
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography>Error: {error.message}</Typography>}
            <List
              sx={{
                height: "200px",
                overflow: "auto",
              }}
              disablePadding
            >
              {data?.interactions.map((interaction: Interaction) => (
                <ListItem key={interaction.id} disableGutters>
                  <InteractionItem interaction={interaction} />
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
        <div className={styles.content}>
          <InteractionDetails />
        </div>
      </div>
    </Container>
  );
};

export default App;
