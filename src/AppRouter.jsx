import './App.css';
import EnterPinPage from './Pages/Auth/EnterPinPage';
import ForgotPasswordPage from './Pages/Auth/ForgotPasswordPage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import { Routes, Route } from 'react-router';
import HomePage from './Pages/HomePage';
import DashboardPage from './Pages/DashboardPage';

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/auth/register"
        element={<RegisterPage />}
      />
      <Route
        path="/auth/login"
        element={<LoginPage />}
      />
      <Route
        path="/auth/reset-password"
        element={<ForgotPasswordPage />}
      />
      <Route
        path="/auth/enter-pin"
        element={<EnterPinPage />}
      />
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />
    </Routes>
  );
}

export default AppRouter;
