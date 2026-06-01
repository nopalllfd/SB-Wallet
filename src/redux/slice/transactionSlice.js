import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const initialState = {
  transactions: [],
  chart: [],
  receivers: [],
  meta: null,

  loading: false,
  error: null,
  success: false,
};

export const getTransactions = createAsyncThunk('transaction/all', async (payload = {}, thunkAPI) => {
  try {
    const response = await fetchWithAuth(
      `http://localhost:5000/transactions?limit=${payload.limit || '10'}&page=${payload.page || '1'}&search=${payload.search || ''}`,
      {},
      thunkAPI.dispatch,
    );

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Get transaction failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getTrxChart = createAsyncThunk('transaction/chart', async (payload, thunkAPI) => {
  try {
    const response = await fetchWithAuth(
      `http://localhost:5000/transactions/chart?type=${payload.type}&period=${payload.period}`,
      {},
      thunkAPI.dispatch,
    );

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Get transaction chart failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getReceivers = createAsyncThunk('transaction/receiver', async (_, thunkAPI) => {
  try {
    const response = await fetchWithAuth('http://localhost:5000/transactions/transfer/receivers', {}, thunkAPI.dispatch);

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Get receivers failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const transfer = createAsyncThunk('transaction/transfer', async (payload, thunkAPI) => {
  try {
    const response = await fetchWithAuth(
      'http://localhost:5000/transactions/transfer',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      thunkAPI.dispatch,
    );

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'failed to transfer');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.message || 'network error');
  }
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.transactions = action.payload.data.data;
        state.meta = action.payload.data.meta;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getTrxChart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTrxChart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.chart = action.payload.data;
      })
      .addCase(getTrxChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getReceivers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getReceivers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.receivers = action.payload.data.data;
      })
      .addCase(getReceivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(transfer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(transfer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(transfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
