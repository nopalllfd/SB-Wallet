import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.js';
import registerReducer from './slice/registerSlice.js';
import transferReducer from './slice/transferSlice.js';
import transactionReducer from './slice/transactionSlice.js';
import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

export const userPersistConfig = {
  key: 'user',
  storage,
};

export const registerPersistConfig = {
  key: 'userRegister',
  storage,
};

export const transferPersistConfig = {
  key: 'transfer',
  storage,
};
export const transactionPersistConfig = {
  key: 'transaction',
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  register: persistReducer(registerPersistConfig, registerReducer),
  transfer: persistReducer(transferPersistConfig, transferReducer),
  transaction: persistReducer(transactionPersistConfig, transactionReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
