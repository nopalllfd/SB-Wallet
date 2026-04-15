import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { delay } from '../../utils/delay';

const initialState = {
  isLogin: false,
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  const { email, existingValue } = data;
  try {
    await delay(2000);
  } catch (error) {
    throw new Error(error);
  }

  return {
    email,
    fullName: existingValue.fullName || '',
  };
});

export const updateUser = createAsyncThunk('user/updateUser', async (data) => {
  try {
    console.log('MASOOKKKKKKK');
    await delay(2000);
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { fullName: '', email: '' };
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addAsyncThunk(loginUser, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
          prevState.isLogin = false;
        },
        fulfilled: (prevState, { payload }) => {
          prevState.loading = false;
          prevState.user = payload;
          prevState.isLogin = true;
        },
        rejected: (prevState, { error }) => {
          prevState.loading = false;
          prevState.error = error.message;
        },
      })
      .addAsyncThunk(updateUser, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
        },
        fulfilled: (prevState, { payload }) => {
          prevState.loading = false;
          if (prevState.user) {
            prevState.user = {
              ...prevState.user,
              ...payload,
            };
          }
        },
        rejected: (prevState, { error }) => {
          prevState.loading = false;
          prevState.error = error.message;
        },
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
