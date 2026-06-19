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
      `/api/wallet/dashboard`,
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
      pending: (prevState) => {
        prevState.loading = true;
        prevState.error = null;
        prevState.success = false;
      },
      fulfilled: (prevState, action) => {
        prevState.loading = false;
        prevState.success = true;

        const dashboard = action.payload.data;

        prevState.dashboard = {
          balance: dashboard.balance,
          income: dashboard.income,
          expense: dashboard.expense,
        };
      },
      rejected: (prevState, action) => {
        prevState.loading = false;
        prevState.error = action.payload;
      },
    });
  },
});

export default walletSlice.reducer;
