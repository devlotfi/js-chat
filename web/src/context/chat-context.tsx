import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { InMemoryStore } from '../openapi-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/ws-api-definition';

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
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      import.meta.env.VITE_WS_URL,
      {
        transports: ['websocket'],
        auth: {
          accessToken: InMemoryStore.accessToken,
        },
      },
    );

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    socket.emit('SEND_MESSAGE', { text: 'lol', to: 'to' }, (res) => {
      console.log(res);
    });

    socket.on('INCOMING_MESSAGE', () => {});

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
