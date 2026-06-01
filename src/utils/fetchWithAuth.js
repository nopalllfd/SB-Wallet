import { logout } from '../redux/slice/authSlice';

export const fetchWithAuth = async (url, options = {}, dispatch) => {
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
  }

  return response;
};
