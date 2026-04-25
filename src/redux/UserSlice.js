import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  selectedRole: null, // 'volunteer' or 'organization'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      // If payload is null → clear user (logout). Otherwise merge.
      state.user = action.payload === null ? null : { ...state.user, ...action.payload };
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    }
  }
});

export const { updateUser, setSelectedRole } = userSlice.actions;
export default userSlice.reducer;