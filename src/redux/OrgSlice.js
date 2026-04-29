import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orgName: "",
  industry: "",
  cause: "",
  description: "",
  requiredSkills: [],
  environment: {},
  requirements: {},
  submitted: false,
  profilePic: null,
};

const orgSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    updateOrganization: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetOrganization: () => initialState,
  },
});

export const { updateOrganization, resetOrganization } = orgSlice.actions;
export default orgSlice.reducer;
