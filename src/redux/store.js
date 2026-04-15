import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.js';
import registerReducer from './slice/registerSlice.js';

import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

export const userPersistConfig = {
  key: 'user',
  storage,
};

export const registerPersistConfig = {
  ket: 'users',
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  register: persistReducer(registerPersistConfig, registerReducer),
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
