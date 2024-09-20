import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, cn, useDisclosure } from '@nextui-org/react';
import LogoFull from '../assets/svg/logo-full.svg';
import LogoCompact from '../assets/svg/logo-compact.svg';
import { useContext } from 'react';
import { ChatLayoutContext } from '../context/chat-layout-context';
import SignOutModal from './sign-out-modal';
import ChatNavbarDropdown from './chat-navbar-dropdown';

export default function ChatNavbar() {
  const { sidebarOpen, setSidebarOpen } = useContext(ChatLayoutContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex min-h-[4.1rem] relative justify-center items-center border-b border-divider">
      <div className="absolute left-[0.5rem]">
        <Button isIconOnly onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            className={cn('duration-300', sidebarOpen && 'rotate-180')}
          ></FontAwesomeIcon>
        </Button>
      </div>

      <img className="hidden sm:flex h-[2rem]" src={LogoFull} alt="logo" />
      <img className="flex sm:hidden h-[2rem]" src={LogoCompact} alt="logo" />

      <div className="absolute right-[1rem]">
        <ChatNavbarDropdown openSignOutModal={onOpen}></ChatNavbarDropdown>

        <SignOutModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        ></SignOutModal>
      </div>
    </div>
  );
}
