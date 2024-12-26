import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/auth-context';

export function NotProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/chat"></Navigate>;
  }

  return children;
}
