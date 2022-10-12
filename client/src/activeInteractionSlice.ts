import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { ActiveInteractionState } from "./types";

// TODO: Create separete features folder.
const initialState: ActiveInteractionState = {
  value: null,
};

const activeInteractionSlice = createSlice({
  name: "activeInteraction",
  initialState,
  reducers: {
    updateId: (
      state,
      action: PayloadAction<ActiveInteractionState["value"]>
    ) => {
      state.value = action.payload;
    },
  },
});

const { updateId } = activeInteractionSlice.actions;

export { activeInteractionSlice, updateId };
export default activeInteractionSlice.reducer;
