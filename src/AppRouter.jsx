import './App.css';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router';
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
  const { user } = useSelector((state) => state.user);
  if (!user) return <Navigate to="/auth/login" replace />;
  return <Outlet />;
}

function AuthRouteGuard() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const isPinRoute = location.pathname === '/auth/pin';
  const canAccessPinSetup = Boolean(user && user.hasPin === false && isPinRoute);
  if (canAccessPinSetup) return <Outlet />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function AppRouter() {
  const isLoading = useSelector((state) => Boolean(state?.user?.loading || state?.register?.loading));

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40">
          <div className="rounded-lg px-8 py-6">
            <LoadingIndicator size="md" label="Memuat..." />
          </div>
        </div>
      ) : null}

      <Routes>
        <Route path="auth" element={<AuthRouteGuard />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="pin" element={<EnterPinPage />} />
          <Route path="forgot/password" element={<ForgotPasswordPage />} />
          <Route path="forgot/password/change" element={<ForgotPasswordChangePage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
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
      </Routes>
    </>
  );
}

export default AppRouter;
