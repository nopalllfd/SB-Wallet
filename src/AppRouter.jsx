import './App.css';
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

function AppRouter() {
  return (
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
  );
}

export default AppRouter;
