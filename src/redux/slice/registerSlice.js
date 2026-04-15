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
    register: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export const { register } = registerSlice.actions;
export default registerSlice.reducer;
