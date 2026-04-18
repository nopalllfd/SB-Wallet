import { createSlice } from '@reduxjs/toolkit';
// import { delay } from '../../utils/delay';

const initialState = {
  users: [],
  loading: false,
  error: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerUser: (state, { payload }) => {
      state.users.push(payload);
    },
    updateUserPassword: (state, { payload }) => {
      const { email, newPassword } = payload || {};
      const targetEmail = String(email || '').trim();
      if (!targetEmail) return;
      const user = state.users.find((u) => u?.email === targetEmail);
      if (!user) return;
      user.password = newPassword;
    },
    updateUserPin: (state, { payload }) => {
      const { email, pin } = payload || {};
      const targetEmail = String(email || '').trim();
      if (!targetEmail) return;
      const user = state.users.find((u) => u?.email === targetEmail);
      if (!user) return;
      user.pin = pin;
    },
  },
});

export const { registerUser, updateUserPassword, updateUserPin } = registerSlice.actions;
export default registerSlice.reducer;
