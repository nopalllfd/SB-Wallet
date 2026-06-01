import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRouter from './AppRouter.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import ToastSuccess from './components/Toast/Toast.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastSuccess />
        <AppRouter />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
