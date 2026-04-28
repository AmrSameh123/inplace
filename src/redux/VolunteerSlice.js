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
  profilePic: null, // الإضافة الجديدة لتخزين الصورة كـ Base64
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
  },
});

export const { updateVolunteer, resetVolunteer } = volunteerSlice.actions;
export default volunteerSlice.reducer;