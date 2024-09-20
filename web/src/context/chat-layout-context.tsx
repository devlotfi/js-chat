import { createContext, PropsWithChildren, useState } from 'react';

interface ChatLayoutContext {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const initialValue: ChatLayoutContext = {
  sidebarOpen: true,
  setSidebarOpen() {},
};

export const ChatLayoutContext = createContext(initialValue);

export default function ChatLayoutContextProvider({
  children,
}: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    initialValue.sidebarOpen,
  );

  return (
    <ChatLayoutContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </ChatLayoutContext.Provider>
  );
}
