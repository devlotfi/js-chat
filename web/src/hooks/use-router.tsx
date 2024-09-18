import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignInPage from '../pages/sign-in-page';

export default function useRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={'/sign-in'}></Navigate>,
    },
    {
      path: '/sign-in',
      element: <SignInPage></SignInPage>,
    },
  ]);

  return { router };
}
