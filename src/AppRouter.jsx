import './App.css';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import EnterPinPage from './Pages/Auth/EnterPinPage';
import ForgotPasswordPage from './Pages/Auth/ForgotPasswordPage';
import ForgotPasswordChangePage from './Pages/Auth/ForgotPasswordChangePage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';

import HomePage from './Pages/HomePage';
import DashboardPage from './Pages/DashboardPage';
import TransferPage from './Pages/TransferPage';
import HistoryPage from './Pages/HistoryPage';
import TransferDetailPage from './Pages/TransferDetailPage';
import ProfilePage from './Pages/ProfilePage';
import TopUpPage from './Pages/TopUpPage';
import ProfileChangePinPage from './Pages/ProfileChangePinPage';
import ProfileChangePasswordPage from './Pages/ProfileChangePasswordPage';

import { LoadingIndicator } from './components/application/loading-indicator/loading-indicator';

function PrivateRouteGuard() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

function AppRouter() {
  const authLoading = useSelector((state) => state.auth.loading);

  return (
    <>
      {authLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40">
          <div className="rounded-lg px-8 py-6">
            <LoadingIndicator size="md" label="Memuat..." />
          </div>
        </div>
      )}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />

        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="pin" element={<EnterPinPage />} />
          <Route path="forgot/password" element={<ForgotPasswordPage />} />
          <Route path="forgot/password/change" element={<ForgotPasswordChangePage />} />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRouteGuard />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transaction" element={<Navigate to="/history" replace />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/transfer/:userId" element={<TransferDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/change/pin" element={<ProfileChangePinPage />} />
          <Route path="/profile/change/password" element={<ProfileChangePasswordPage />} />
          <Route path="/topup" element={<TopUpPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppRouter;
