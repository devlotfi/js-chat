import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignInPage from '../pages/sign-in-page';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import ChatLayout from '../layout/app-layout';
import ChatLayoutContextProvider from '../context/chat-layout-context';

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
      element: authGuard(
        true,
        <ChatLayoutContextProvider>
          <ChatLayout></ChatLayout>
        </ChatLayoutContextProvider>,
      ),
      children: [
        {
          path: '/app',
          element: <div className="flex flex-1 bg-background-100"></div>,
        },
      ],
    },
  ]);

  return { router };
}
