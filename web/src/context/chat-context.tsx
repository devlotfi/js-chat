import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { InMemoryStore } from '../openapi-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/ws-api-definition';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { components } from '../__generated__/schema';

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
  const queryClient = useQueryClient();
  const { conversationId } = useParams();
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

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    socket.on('INCOMING_MESSAGE', (message) => {
      queryClient.setQueryData(
        [
          'get',
          '/messages/{conversationId}',
          {
            params: {
              path: {
                conversationId,
              },
            },
          },
        ],
        (messages: components['schemas']['MessageDTO'][]) => {
          return [...messages, message];
        },
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId, queryClient]);

  return (
    <ChatContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </ChatContext.Provider>
  );
}
