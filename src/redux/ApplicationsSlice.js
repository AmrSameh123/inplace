import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication: (state, action) => {
      const exists = state.applications.find(
        (app) => app.volunteerId === action.payload.volunteerId && app.opportunityId === action.payload.opportunityId
      );
      if (!exists) {
        state.applications.push({
          ...action.payload,
          id: Date.now().toString(),
          status: "pending",
          read: false,
          timestamp: new Date().toISOString()
        });
      }
    },
    updateApplicationStatus: (state, action) => {
      const { applicationId, status } = action.payload;
      const app = state.applications.find((a) => a.id === applicationId);
      if (app) {
        app.status = status;
        app.read = false; // Mark as unread when status changes (new message)
      }
    },
    markAsRead: (state, action) => {
      const { applicationId } = action.payload;
      const app = state.applications.find((a) => a.id === applicationId);
      if (app) {
        app.read = true;
      }
    },
    clearApplications: (state) => {
      state.applications = [];
    }
  },
});

export const { addApplication, updateApplicationStatus, markAsRead, clearApplications } = applicationsSlice.actions;
export default applicationsSlice.reducer;
