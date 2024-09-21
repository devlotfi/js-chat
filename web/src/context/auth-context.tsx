import { createContext, PropsWithChildren, useEffect } from 'react';
import { components } from '../__generated__/schema';
import { Spinner } from '@nextui-org/react';
import LogoCompact from '../assets/svg/logo-compact.svg';
import { $api, InMemoryStore } from '../openapi-client';

interface AuthContext {
  user: components['schemas']['UserDTO'] | null;
}

const initialValue: AuthContext = {
  user: null,
};

export const AuthContext = createContext(initialValue);

export default function AuthProvider({ children }: PropsWithChildren) {
  const { isLoading, data } = $api.useQuery(
    'get',
    '/auth/sign-in/refresh-token',
    {
      credentials: 'include',
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      select(data) {
        InMemoryStore.accessToken = data.accessToken;
        return data;
      },
    },
  );

  useEffect(() => {
    if (data) {
      InMemoryStore.accessToken = data.accessToken;
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-5 h-screen w-screen justify-center items-center">
        <img className="h-[3rem]" src={LogoCompact} alt="logo" />
        <Spinner size="lg" color="primary"></Spinner>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
