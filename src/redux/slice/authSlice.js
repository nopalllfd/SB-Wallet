import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Register failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// =========================
// LOGIN
// =========================
export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.error || 'Login failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// =========================
// PIN
// =========================
export const setUserPin = createAsyncThunk('auth/pin', async (pin, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/auth/pin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pin }),
    });

    const data = await res.json();

    if (!res.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Set PIN failed');
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
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('token');
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // REGISTER
      // =========================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // LOGIN
      // =========================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const user = action.payload.data;

        state.user = {
          display_name: user.display_name,
          photo: user.photo,
          isPinExists: user.isPinExists,
        };

        state.token = user.token;
        state.isAuthenticated = true;

        localStorage.setItem('token', user.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(setUserPin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(setUserPin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(setUserPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState, logout } = authSlice.actions;
