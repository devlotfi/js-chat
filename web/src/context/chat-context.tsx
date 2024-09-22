import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface ChatContext {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const initialValue: ChatContext = {
  sidebarOpen: true,
  setSidebarOpen() {},
};

export const ChatContext = createContext(initialValue);

export default function ChatContextProvider({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    initialValue.sidebarOpen,
  );

  useEffect(() => {
    const socket = io('ws://localhost:5000', {
      transports: ['websocket'],
      auth: {
        accessToken: 'lol',
      },
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    socket.on('test', () => {
      console.log('rec');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ChatContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </ChatContext.Provider>
  );
}
