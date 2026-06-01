import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../utils/fetchWithAuth';
import { apiUrl } from '../../utils/env';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  selectedUser: null,
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const response = await fetchWithAuth(
      `${apiUrl}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
      thunkAPI.dispatch,
    );

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Register failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const response = await fetchWithAuth(
      `${apiUrl}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
      thunkAPI.dispatch,
    );

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.error || 'Login failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const setUserPin = createAsyncThunk('auth/pin', async (pin, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetchWithAuth(
      `${apiUrl}/auth/pin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pin }),
      },
      thunkAPI.dispatch,
    );

    const data = await res.json();

    if (!res.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Set PIN failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetchWithAuth(
      `${apiUrl}/auth/logout`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      thunkAPI.dispatch,
    );

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    thunkAPI.dispatch(logout());

    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getUserDetail = createAsyncThunk('auth/user-detail', async (userId, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`${apiUrl}/auth/user/${userId}`, {}, thunkAPI.dispatch);

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Get user detail failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.selectedUser = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addAsyncThunk(registerUser, {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state) => {
          state.loading = false;
          state.success = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      })

      .addAsyncThunk(loginUser, {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.success = true;

          const user = action.payload.data;

          const userData = {
            display_name: user.display_name,
            photo: user.photo,
            isPinExists: user.isPinExists,
          };

          state.user = userData;
          state.token = user.token;
          state.isAuthenticated = true;

          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(userData));
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      })

      .addAsyncThunk(setUserPin, {
        fulfilled: (state) => {
          state.loading = false;
          state.success = true;

          if (state.user) {
            state.user.isPinExists = true;
          }
        },
      })

      .addAsyncThunk(logoutUser, {
        fulfilled: (state) => {
          state.loading = false;
          state.success = true;
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        },
      })

      .addAsyncThunk(getUserDetail, {
        fulfilled: (state, action) => {
          state.loading = false;
          state.selectedUser = action.payload.data;
        },
      });
  },
});

export const { setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;
