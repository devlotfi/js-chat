import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import Hexagon from '../assets/svg/hexagon.svg';
import LogoFull from '../assets/svg/logo-full.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComputer,
  faMoon,
  faPaintBrush,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { ThemeOptions } from '../types/theme-options';
import GoogleLogo from '../assets/svg/google.svg';
import { useGoogleLogin } from '@react-oauth/google';

export default function SignInPage() {
  const { themeOption, setTheme } = useContext(ThemeContext);

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div
      style={{
        backgroundImage: `url(${Hexagon})`,
        backgroundSize: '7rem auto',
      }}
      className="flex flex-1"
    >
      <div className="flex flex-1 flex-col bg-gradient-to-b from-background from-70% via-background to-op lg:bg-background">
        <Navbar>
          <NavbarBrand>
            <img className="h-[2.5rem]" src={LogoFull} alt="logo" />
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
              <Dropdown className="bg-background">
                <DropdownTrigger>
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={
                      <FontAwesomeIcon icon={faPaintBrush}></FontAwesomeIcon>
                    }
                  >
                    Themes
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectionMode="single"
                  selectedKeys={[themeOption]}
                  onAction={(key) => {
                    setTheme(key as ThemeOptions);
                  }}
                >
                  <DropdownItem
                    key={ThemeOptions.SYSTEM}
                    startContent={
                      <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>
                    }
                  >
                    System
                  </DropdownItem>
                  <DropdownItem
                    key={ThemeOptions.LIGHT}
                    startContent={
                      <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
                    }
                  >
                    Light
                  </DropdownItem>
                  <DropdownItem
                    key={ThemeOptions.DARK}
                    startContent={
                      <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
                    }
                  >
                    Dark
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

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
            onClick={() => login()}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-r from-background to-transparent"></div>
    </div>
  );
}
