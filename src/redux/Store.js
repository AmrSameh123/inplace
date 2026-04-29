// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './UserSlice';
// import volunteerReducer from "./VolunteerSlice";
// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });




import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import volunteerReducer from "./VolunteerSlice";
import orgReducer from "./OrgSlice";
import applicationsReducer from "./ApplicationsSlice";
import communityReducer from "./CommunitySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,      
    volunteer: volunteerReducer, 
    organization: orgReducer,
    applications: applicationsReducer,
    community: communityReducer,
  },
});
