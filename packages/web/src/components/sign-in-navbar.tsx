import {
  faPaintBrush,
  faComputer,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { ThemeOptions } from '../types/theme-options';
import LogoFull from '../assets/svg/logo-full.svg';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';

export default function SignInNavbar() {
  const { themeOption, setTheme } = useContext(ThemeContext);

  return (
    <Navbar>
      <NavbarBrand>
        <img className="h-[2.5rem]" src={LogoFull} alt="logo" />
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
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
                startContent={<FontAwesomeIcon icon={faSun}></FontAwesomeIcon>}
              >
                Light
              </DropdownItem>
              <DropdownItem
                key={ThemeOptions.DARK}
                startContent={<FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>}
              >
                Dark
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
