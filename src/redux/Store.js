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

export const store = configureStore({
  reducer: {
    user: userReducer,      // ده بتاع بيانات المستخدم (زي الساعات اللي فيها إيرور)
    volunteer: volunteerReducer, // ده اللي ناقص! لازم يتضاف عشان صفحات كنزي تشتغل
  },
});
