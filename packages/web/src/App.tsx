import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { NotProtectedRoute } from './router/not-protected-route';
import SignInPage from './pages/sign-in-page';
import { ProtectedRoute } from './router/protected-route';
import ChatContextProvider from './context/chat-context';
import ChatLayout from './layout/chat-layout';
import ChooseConversation from './components/conversation/choose-conversation';
import ConversationPage from './pages/conversation-page';

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen min-w-screen flex flex-col">
        <Routes>
          <Route index element={<Navigate to="/sign-in"></Navigate>}></Route>
          <Route
            path="sign-in"
            element={
              <NotProtectedRoute>
                <SignInPage></SignInPage>
              </NotProtectedRoute>
            }
          ></Route>
          <Route
            path="chat"
            element={
              <ProtectedRoute>
                <ChatContextProvider>
                  <ChatLayout></ChatLayout>
                </ChatContextProvider>
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<ChooseConversation></ChooseConversation>}
            ></Route>
            <Route
              path="conversation/:conversationId"
              element={<ConversationPage></ConversationPage>}
            ></Route>
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
