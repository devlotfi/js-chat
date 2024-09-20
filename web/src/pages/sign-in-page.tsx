import { Button } from '@nextui-org/react';
import BackgroundPattern from '../assets/svg/circuit-board.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import GoogleLogo from '../assets/svg/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { Constants } from '../constants';
import { $api } from '../openapi-client';
import { useQueryClient } from '@tanstack/react-query';
import SignInNavbar from '../components/sign-in-navbar';

export default function SignInPage() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = $api.useMutation('post', '/auth/sign-in', {
    onSuccess(data) {
      sessionStorage.setItem(
        Constants.ACCESS_TOKEN_STORAGE_KEY,
        data.accessToken,
      );
      queryClient.invalidateQueries({
        queryKey: ['get', '/auth/sign-in/refresh-token'],
      });
    },
  });

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (tokenResponse) =>
      mutate({
        body: {
          code: tokenResponse.code,
        },
        credentials: 'include',
      }),
  });

  useEffect(() => {
    console.log(sessionStorage.getItem(Constants.ACCESS_TOKEN_STORAGE_KEY));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundPattern})`,
        backgroundSize: '15rem auto',
      }}
      className="flex flex-1"
    >
      <div className="flex flex-1 flex-col bg-gradient-to-b from-background from-70% via-background to-op lg:bg-background">
        <SignInNavbar></SignInNavbar>

        <div className="flex flex-col flex-1 items-center lg:justify-center text-center">
          <div className="flex bg-background-100 h-[5.5rem] w-[5.5rem] mb-[3rem] justify-center items-center rounded-full mt-[2rem]">
            <FontAwesomeIcon
              className="text-primary text-[2.5rem]"
              icon={faUser}
            ></FontAwesomeIcon>
          </div>

          <div className="flex font-bold text-[23pt]">Welcome to Js Chat</div>
          <div className="text-[13pt]">Sign in to use the app</div>

          <Button
            className="px-[3rem] py-[1.5rem] mt-[2rem]"
            endContent={<img src={GoogleLogo} alt="google"></img>}
            isLoading={isPending}
            onPress={() => login()}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-r from-background to-transparent"></div>
    </div>
  );
}
