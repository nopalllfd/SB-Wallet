import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: {
      reducer: (state, action) => {
        state.transactions.unshift(action.payload);
      },
      prepare: ({ userId, type, amount, message, toUserId = null }) => {
        return {
          payload: {
            id: Date.now(),
            userId,
            toUserId,
            type,
            amount,
            message,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
