import store from "./store";

type Interaction = {
  id: string;
  topic: string;
  start_time: string;
  user_id: string;
};

type ActiveInteractionState = {
  value: string | null;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { ActiveInteractionState, Interaction, RootState, AppDispatch };
