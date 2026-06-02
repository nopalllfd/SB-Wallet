import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { delay } from '../../utils/delay';
import { updateUser, updateUserPin } from './registerSlice';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const initialState = {
  isLogin: false,
  user: null,
  profile: null,
  loading: false,
  error: null,
  forgotPassword: {
    email: null,
  },
};

export const getProfile = createAsyncThunk('user/profile', async (_, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`/api/user/profile`);
    const data = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'failed to get profile');
    }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  try {
    await delay(2000);
  } catch (error) {
    throw new Error(error);
  }

  return data;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    await delay(1000);
    return true;
  } catch (error) {
    throw new Error(error);
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setForgotEmail: (prevState, { payload }) => {
      prevState.forgotPassword.email = payload;
    },
    updateBalance: (prevState, action) => {
      const { amount, type } = action.payload;

      if (!prevState.user) return;

      const prevBalanceRaw = Number(prevState.user.balance);
      const prevBalance = Number.isFinite(prevBalanceRaw) ? prevBalanceRaw : 0;
      const deltaRaw = Number(amount);
      const delta = Number.isFinite(deltaRaw) ? deltaRaw : 0;

      if (type === 'TOP_UP') prevState.user.balance = prevBalance + delta;
      if (type === 'TRANSFER_OUT') prevState.user.balance = prevBalance - delta;
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
      .addAsyncThunk(logoutUser, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
        },
        fulfilled: (prevState) => {
          prevState.loading = false;
          prevState.user = null;
          prevState.isLogin = false;
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
          if (prevState.user && prevState.user.id == targetId) {
            prevState.user = {
              ...prevState.user,
              ...newData,
            };
          }
        },
        rejected: (prevState, { error }) => {
          prevState.loading = false;
          prevState.error = error.message;
        },
      })
      .addAsyncThunk(updateUserPin, {
        fulfilled: (state, { payload }) => {
          const { email, pin } = payload || {};
          if (state.user && state.user.email == email) {
            state.user.hasPin = pin !== '';
          }
        },
      })
      .addAsyncThunk(getProfile, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
        },
        fulfilled: (prevState, { payload }) => {
          prevState.loading = false;
          prevState.profile = payload.data;
        },
        rejected: (prevState, { error }) => {
          prevState.loading = false;
          prevState.error = error.message;
        },
      });
  },
});
export const { setForgotEmail, updateBalance } = userSlice.actions;
export default userSlice.reducer;
