import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignInPage from '../pages/sign-in-page';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import ChatLayout from '../layout/chat-layout';
import ChatContextProvider from '../context/chat-context';
import ChooseConversation from '../components/conversation/choose-conversation';
import ConversationPage from '../pages/conversation-page';

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
      return <Navigate to={'/chat'}></Navigate>;
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
      path: '/chat',
      element: authGuard(
        true,
        <ChatContextProvider>
          <ChatLayout></ChatLayout>
        </ChatContextProvider>,
      ),
      children: [
        {
          path: '/chat',
          element: <ChooseConversation></ChooseConversation>,
        },
        {
          path: '/chat/conversation/:conversationId',
          element: <ConversationPage></ConversationPage>,
        },
      ],
    },
  ]);

  return { router };
}
