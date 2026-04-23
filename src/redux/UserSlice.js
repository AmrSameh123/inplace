import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
    selectedRole: null, // 'volunteer' or 'organization'
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
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    }
  }
});

export const { updateUser, setFormData, setSelectedRole } = userSlice.actions;
export default userSlice.reducer;