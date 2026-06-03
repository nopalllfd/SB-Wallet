import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const AuthLayouts = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user.isPinExists) {
      navigate('/dashboard');
    }
  }, [auth.isAuthenticated, navigate]);
  return <section className="w-full max-w-2xl py-10 px-4 flex flex-col gap-4 bg-white rounded-xl md:rounded-xl md:p-10">{children}</section>;
};
