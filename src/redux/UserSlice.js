import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: "Alaa Khaled",
    role: "volunteer", 
    hours: 48,
  },
  formData: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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