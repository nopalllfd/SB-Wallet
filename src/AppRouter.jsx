import './App.css';
import ForgotPasswordPage from './Pages/Auth/ForgotPasswordPage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import { Routes, Route } from 'react-router';

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
    </Routes>
  );
}

export default AppRouter;
