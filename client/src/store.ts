import { configureStore } from "@reduxjs/toolkit";
import activeInteractionReducer from "./activeInteractionSlice";

// Create redux store.
// TODO: Consider using React context api instead.
const store = configureStore({
  reducer: {
    activeInteraction: activeInteractionReducer,
  },
});

export default store;
