import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  gender: "",
  track: "",
  skills: [],
  experienceYears: "",
  softSkills: {},
  personality: {},
  submitted: false,
  hours: 42, // قيمة افتراضية زي ما كانت عندك
  profilePic: null, 
  appliedOpportunities: [], 
};

const volunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {
    // الأكشن اللي بيحدث أي داتا بتبعتيها
    updateVolunteer: (state, action) => {
      // action.payload هو الكائن اللي فيه التعديلات الجديدة
      return { ...state, ...action.payload };
    },
    // لو حابة ترجعي الداتا فاضية وقت اللوج أوت مثلاً
    resetVolunteer: () => initialState,
    applyOpportunity: (state, action) => {
      const exists = state.appliedOpportunities.find(op => op.id === action.payload.id);
      if (!exists) {
        state.appliedOpportunities.push(action.payload);
      }
    },
    removeOpportunity: (state, action) => {
      state.appliedOpportunities = state.appliedOpportunities.filter(op => op.id !== action.payload);
    },
  },
});

export const { updateVolunteer, resetVolunteer, applyOpportunity, removeOpportunity } = volunteerSlice.actions;
export default volunteerSlice.reducer;