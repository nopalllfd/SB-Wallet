import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { delay } from '../../utils/delay';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk('register/registerUser', async (payload) => {
  try {
    await delay(2000);
    const trimmedEmail = String(payload?.email || '').trim();
    return {
      id: Date.now(),
      email: trimmedEmail,
      password: payload?.password,
      fullName: '',
      phone: '',
      pin: '',
    };
  } catch (error) {
    throw new Error(error);
  }
});

export const updateUserPassword = createAsyncThunk('register/updateUserPassword', async (payload) => {
  try {
    await delay(2000);
    const targetEmail = String(payload?.email || '').trim();
    return { email: targetEmail, newPassword: payload?.newPassword };
  } catch (error) {
    throw new Error(error);
  }
});

export const updateUserPin = createAsyncThunk('register/updateUserPin', async (payload) => {
  try {
    await delay(2000);
    const targetEmail = String(payload?.email || '').trim();
    return { email: targetEmail, pin: payload?.pin };
  } catch (error) {
    throw new Error(error);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async (data) => {
  try {
    await delay(2000);
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addAsyncThunk(registerUser, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
        },
        fulfilled: (prevState, { payload }) => {
          prevState.loading = false;
          prevState.users.push(payload);
        },
        rejected: (prevState, { error }) => {
          prevState.loading = false;
          prevState.error = error.message;
        },
      })
      .addAsyncThunk(updateUserPassword, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
        },
        fulfilled: (prevState, { payload }) => {
          prevState.loading = false;
          const targetEmail = String(payload?.email || '').trim();
          if (!targetEmail) return;
          const user = prevState.users.find((u) => u?.email === targetEmail);
          if (!user) return;
          user.password = payload?.newPassword;
        },
        rejected: (prevState, { error }) => {
          prevState.loading = false;
          prevState.error = error.message;
        },
      })
      .addAsyncThunk(updateUserPin, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
        },
        fulfilled: (prevState, { payload }) => {
          prevState.loading = false;
          const targetEmail = String(payload?.email || '').trim();
          if (!targetEmail) return;
          const user = prevState.users.find((u) => u?.email === targetEmail);
          if (!user) return;
          user.pin = payload?.pin;
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
          const { targetId, newData } = payload;
          const user = prevState.users.find((u) => u.id === targetId);
          if (user) {
            Object.assign(user, newData);
          }
        },
        rejected: (prevState, { error }) => {
          prevState.loading = false;
          prevState.error = error.message;
        },
      });
  },
});

export default registerSlice.reducer;
