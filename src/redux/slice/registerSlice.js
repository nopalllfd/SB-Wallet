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
  },
});

export const { registerUser } = registerSlice.actions;
export default registerSlice.reducer;
