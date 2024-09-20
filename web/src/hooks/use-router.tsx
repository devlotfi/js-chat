import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignInPage from '../pages/sign-in-page';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import AppLayout from '../layout/app-layout';

export default function useRouter() {
  const { user } = useContext(AuthContext);

  const authGuard = (protectedRoute: boolean = false, element: JSX.Element) => {
    if (protectedRoute) {
      if (user) {
        return element;
      }
      return <Navigate to={'/sign-in'}></Navigate>;
    } else {
      if (!user) {
        return element;
      }
      return <Navigate to={'/app'}></Navigate>;
    }
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={'/sign-in'}></Navigate>,
    },
    {
      path: '/sign-in',
      element: authGuard(false, <SignInPage></SignInPage>),
    },
    {
      path: '/app',
      element: authGuard(true, <AppLayout></AppLayout>),
      children: [
        {
          path: '/app',
          element: <h1>home</h1>,
        },
      ],
    },
  ]);

  return { router };
}
