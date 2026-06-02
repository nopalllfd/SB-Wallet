import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const initialState = {
  dashboard: null,

  loading: false,
  error: null,
  success: false,
};

export const getDashboard = createAsyncThunk('wallet/dashboard', async (payload, thunkAPI) => {
  try {
    const response = await fetchWithAuth(
      `/wallet/dashboard`,
      {
        method: 'GET',
      },
      thunkAPI.dispatch,
    );

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.error || 'Get dashboard failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(getDashboard, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.success = true;

        const dashboard = action.payload.data;

        state.dashboard = {
          balance: dashboard.balance,
          income: dashboard.income,
          expense: dashboard.expense,
        };
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    });
  },
});

export default walletSlice.reducer;
