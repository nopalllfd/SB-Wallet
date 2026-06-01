import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../utils/fetchWithAuth';
import { apiUrl } from '../../utils/env';

const initialState = {
  transactions: [],
  chart: [],
  receivers: [],
  meta: null,
  methods: [],

  loading: false,
  error: null,
  success: false,
};

export const getTransactions = createAsyncThunk('transaction/all', async (payload = {}, thunkAPI) => {
  try {
    const response = await fetchWithAuth(
      `${apiUrl}/transactions?limit=${payload.limit || '10'}&page=${payload.page || '1'}&search=${payload.search || ''}`,
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
    const response = await fetchWithAuth(`${apiUrl}/transactions/chart?type=${payload.type}&period=${payload.period}`, {}, thunkAPI.dispatch);

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'Get transaction chart failed');
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getReceivers = createAsyncThunk('transaction/receiver', async (payload, thunkAPI) => {
  try {
    const response = await fetchWithAuth(
      `${apiUrl}/transactions/transfer/receivers?page=${payload.page || 1}&limit=${payload.limit || 10}&search=${payload.search || ''}`,
      {},
      thunkAPI.dispatch,
    );

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
      `${apiUrl}/transactions/transfer`,
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

export const getMethods = createAsyncThunk('transcation/methods', async (_, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`${apiUrl}/transactions/payments`);
    const data = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(response.message || 'failed to get payment methods');
    }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error || error.message || 'failed to get payment');
  }
});

export const topup = createAsyncThunk('transaction/topup', async (payload, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`${apiUrl}/transactions/topup`, {
      body: JSON.stringify(payload),
      method: 'POST',
    });
    const data = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'failed to topup');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===================== TRANSACTIONS =====================
      .addAsyncThunk(getTransactions, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.success = true;
          state.transactions = action.payload.data.data;
          state.meta = action.payload.data.meta;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      })

      // ===================== CHART =====================
      .addAsyncThunk(getTrxChart, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.success = true;
          state.chart = action.payload.data;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      })

      // ===================== RECEIVERS =====================
      .addAsyncThunk(getReceivers, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.success = true;
          state.receivers = action.payload.data.data;
          state.meta = action.payload.data.meta;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      })

      // ===================== TRANSFER =====================
      .addAsyncThunk(transfer, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
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

      // ===================== TOPUP =====================
      .addAsyncThunk(topup, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
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

      // ===================== METHODS =====================
      .addAsyncThunk(getMethods, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.success = true;
          state.methods = action.payload.data;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      });
  },
});

export default transactionSlice.reducer;
