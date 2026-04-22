import './App.css';
import { useSelector } from 'react-redux';
import EnterPinPage from './Pages/Auth/EnterPinPage';
import ForgotPasswordPage from './Pages/Auth/ForgotPasswordPage';
import ForgotPasswordChangePage from './Pages/Auth/ForgotPasswordChangePage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import { Routes, Route } from 'react-router';
import HomePage from './Pages/HomePage';
import DashboardPage from './Pages/DashboardPage';
import TransferPage from './Pages/TransferPage';
import TransactionPage from './Pages/TransactionPage';
import TransferDetailPage from './Pages/TransferDetailPage';
import ProfilePage from './Pages/ProfilePage';
import TopUpPage from './Pages/TopUpPage';
import ProfileChangePinPage from './Pages/ProfileChangePinPage';
import ProfileChangePasswordPage from './Pages/ProfileChangePasswordPage';
import { LoadingIndicator } from './components/application/loading-indicator/loading-indicator';

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
        <Route path="auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="pin" element={<EnterPinPage />} />
          <Route path="forgot/password" element={<ForgotPasswordPage />} />
          <Route path="forgot/password/change" element={<ForgotPasswordChangePage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/transfer/:userId" element={<TransferDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/change/pin" element={<ProfileChangePinPage />} />
        <Route path="/profile/change/password" element={<ProfileChangePasswordPage />} />
        <Route path="/topup" element={<TopUpPage />} />
      </Routes>
    </>
  );
}

export default AppRouter;
