import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    const response = await fetchWithAuth(`/api/user/profile`, {}, thunkAPI.dispatch);
    const data = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'failed to get profile');
    }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const editProfile = createAsyncThunk('user/editProfile', async ({ fullname, phone, photo }, thunkAPI) => {
  try {
    const formData = new FormData();

    if (fullname) formData.append('fullname', fullname);
    if (phone) formData.append('phone', phone);
    if (photo) formData.append('photo', photo);

    const response = await fetchWithAuth(`/api/user/profile`, {
      method: 'PATCH',
      body: formData,
    }, thunkAPI.dispatch);

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Failed to update profile');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.message || 'Failed to update profile');
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
        fulfilled: (prevState, { payload }) => {
          const { email, pin } = payload || {};
          if (prevState.user && prevState.user.email == email) {
            prevState.user.hasPin = pin !== '';
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
      })
      .addAsyncThunk(editProfile, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
        },
        fulfilled: (prevState, { payload }) => {
          prevState.loading = false;

          if (payload?.data) {
            const profileData = {
              fullName: payload.data.fullname,
              phone: payload.data.phone,
              photo: payload.data.photo,
            };

            prevState.profile = profileData;

            if (prevState.user) {
              prevState.user = {
                ...prevState.user,
                ...profileData,
              };
            }
          }
        },
        rejected: (prevState, { payload, error }) => {
          prevState.loading = false;
          prevState.error = payload || error.message;
        },
      });
  },
});
export const { setForgotEmail, updateBalance } = userSlice.actions;
export default userSlice.reducer;
