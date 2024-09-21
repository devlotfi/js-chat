import {
  faComputer,
  faMoon,
  faPowerOff,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { ThemeContext } from '../context/theme-context';
import { ThemeOptions } from '../types/theme-options';

interface Props {
  openSignOutModal: () => void;
}

export default function ChatNavbarDropdown({ openSignOutModal }: Props) {
  const { user } = useContext(AuthContext);
  const { themeOption, setTheme } = useContext(ThemeContext);

  if (!user) {
    throw new Error('No user');
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          color="primary"
          isBordered
          src={user.profilePicture}
          imgProps={{ referrerPolicy: 'no-referrer' }}
          as="button"
        ></Avatar>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        closeOnSelect={false}
        selectedKeys={[themeOption]}
        onAction={(key) => {
          {
            switch (key) {
              case ThemeOptions.SYSTEM:
                setTheme(ThemeOptions.SYSTEM);
                break;
              case ThemeOptions.LIGHT:
                setTheme(ThemeOptions.LIGHT);
                break;
              case ThemeOptions.DARK:
                setTheme(ThemeOptions.DARK);
                break;
              case 'sign-out':
                openSignOutModal();
                break;
            }
          }
        }}
      >
        <DropdownSection showDivider>
          <DropdownItem textValue="User">
            <div className="flex font-bold text-[13pt]">Signed in as: </div>
            <div className="flex text-[10pt]">{user.username}</div>
            <div className="flex text-[10pt]">({user.email})</div>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection title="Theme" showDivider>
          <DropdownItem
            startContent={<FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>}
            key={ThemeOptions.SYSTEM}
            textValue="system"
          >
            System
          </DropdownItem>
          <DropdownItem
            startContent={<FontAwesomeIcon icon={faSun}></FontAwesomeIcon>}
            key={ThemeOptions.LIGHT}
            textValue="light"
          >
            Light
          </DropdownItem>
          <DropdownItem
            startContent={<FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>}
            key={ThemeOptions.DARK}
            textValue="dark"
          >
            Dark
          </DropdownItem>
        </DropdownSection>

        <DropdownItem
          key="sign-out"
          className="text-danger"
          color="danger"
          textValue="sign-out"
          closeOnSelect
          startContent={<FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>}
        >
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
