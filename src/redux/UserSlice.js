import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: "Alaa Khaled", // تقدري تغيريه بعدين
    role: "volunteer", 
    hours: 48,
  },
  formData: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // دالة لتحديث البيانات لو حبيتي
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    }
  }
});

export const { updateUser, setFormData } = userSlice.actions;
export default userSlice.reducer;