import { Navigate } from 'react-router-dom';

export const PrivateRouter = ({ children }) => {
  const isAuthenticated = document.cookie.includes('token=');

  return isAuthenticated ? children : <Navigate to="/" />;
};
