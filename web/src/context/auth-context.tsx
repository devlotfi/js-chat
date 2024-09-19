import { createContext, PropsWithChildren, useEffect } from 'react';
import { components } from '../__generated__/schema';
import { useQuery } from '@tanstack/react-query';
import { SIGN_IN_REFRESH_TOKEN } from '../react-query/queries';
import { Spinner } from '@nextui-org/react';
import LogoCompact from '../assets/svg/logo-compact.svg';
import { Constants } from '../constants';

interface AuthContext {
  user: components['schemas']['UserDTO'] | null;
}

const initialValue: AuthContext = {
  user: null,
};

export const AuthContext = createContext(initialValue);

export default function AuthProvider({ children }: PropsWithChildren) {
  const { isLoading, data } = useQuery({
    queryKey: [SIGN_IN_REFRESH_TOKEN.name],
    queryFn: SIGN_IN_REFRESH_TOKEN,
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        Constants.ACCESS_TOKEN_STORAGE_KEY,
        data.accessToken,
      );
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
