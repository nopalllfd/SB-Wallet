import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slice/authSlice.js';
import walletSlice from './slice/walletSlice.js';
import transactionSlice from './slice/transactionSlice.js';
import userSlice from './slice/userSlice.js';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    wallet: walletSlice,
    transaction: transactionSlice,
    user: userSlice,
  },
});
