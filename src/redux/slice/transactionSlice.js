import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

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
      `/api/transactions?limit=${payload.limit || '10'}&page=${payload.page || '1'}&search=${payload.search || ''}`,
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
    const response = await fetchWithAuth(`/api/transactions/chart?type=${payload.type}&period=${payload.period}`, {}, thunkAPI.dispatch);

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
      `/api/transactions/transfer/receivers?page=${payload.page || 1}&limit=${payload.limit || 10}&search=${payload.search || ''}`,
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
      `/api/transactions/transfer`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

export const getMethods = createAsyncThunk('transaction/methods', async (_, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`/api/transactions/payments`, {}, thunkAPI.dispatch);
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
    const response = await fetchWithAuth(`/api/transactions/topup`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      method: 'POST',
    }, thunkAPI.dispatch);
    const data = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(data?.message || 'failed to topup');
    }
    return data;
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
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
          prevState.success = false;
        },
        fulfilled: (prevState, action) => {
          prevState.loading = false;
          prevState.success = true;
          prevState.transactions = action.payload.data.data;
          prevState.meta = action.payload.data.meta;
        },
        rejected: (prevState, action) => {
          prevState.loading = false;
          prevState.error = action.payload;
        },
      })

      // ===================== CHART =====================
      .addAsyncThunk(getTrxChart, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
          prevState.success = false;
        },
        fulfilled: (prevState, action) => {
          prevState.loading = false;
          prevState.success = true;
          prevState.chart = action.payload.data;
        },
        rejected: (prevState, action) => {
          prevState.loading = false;
          prevState.error = action.payload;
        },
      })

      // ===================== RECEIVERS =====================
      .addAsyncThunk(getReceivers, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
          prevState.success = false;
        },
        fulfilled: (prevState, action) => {
          prevState.loading = false;
          prevState.success = true;
          prevState.receivers = action.payload.data.data;
          prevState.meta = action.payload.data.meta;
        },
        rejected: (prevState, action) => {
          prevState.loading = false;
          prevState.error = action.payload;
        },
      })

      // ===================== TRANSFER =====================
      .addAsyncThunk(transfer, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
          prevState.success = false;
        },
        fulfilled: (prevState) => {
          prevState.loading = false;
          prevState.success = true;
        },
        rejected: (prevState, action) => {
          prevState.loading = false;
          prevState.error = action.payload;
        },
      })

      // ===================== TOPUP =====================
      .addAsyncThunk(topup, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
          prevState.success = false;
        },
        fulfilled: (prevState) => {
          prevState.loading = false;
          prevState.success = true;
        },
        rejected: (prevState, action) => {
          prevState.loading = false;
          prevState.error = action.payload;
        },
      })

      // ===================== METHODS =====================
      .addAsyncThunk(getMethods, {
        pending: (prevState) => {
          prevState.loading = true;
          prevState.error = null;
          prevState.success = false;
        },
        fulfilled: (prevState, action) => {
          prevState.loading = false;
          prevState.success = true;
          prevState.methods = action.payload.data;
        },
        rejected: (prevState, action) => {
          prevState.loading = false;
          prevState.error = action.payload;
        },
      });
  },
});

export default transactionSlice.reducer;
