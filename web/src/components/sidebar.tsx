import { useContext, useState } from 'react';
import { ChatLayoutContext } from '../context/chat-layout-context';
import { Button, cn, Tooltip } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMessage,
  faShare,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import ConversationList from './conversation-list';
import RecievedInvitationsList from './recieved-invitations-list';
import SentInvitationsList from './sent-invitations-list';

export default function Sidebar() {
  const { sidebarOpen } = useContext(ChatLayoutContext);
  const [tab, setTab] = useState<
    'CONVERSATIONS' | 'SENT_INVITATIONS' | 'RECIEVED_INVITATIONS'
  >('CONVERSATIONS');

  const renderContent = () => {
    switch (tab) {
      case 'CONVERSATIONS':
        return <ConversationList></ConversationList>;
      case 'RECIEVED_INVITATIONS':
        return <RecievedInvitationsList></RecievedInvitationsList>;
      case 'SENT_INVITATIONS':
        return <SentInvitationsList></SentInvitationsList>;
    }
  };

  return (
    <div
      className={cn(
        'flex h-full w-full md:w-[23rem] lg:h-full overflow-x-hidden absolute lg:flex bg-background max-h-[calc(100vh-4.1rem)] duration-300',
        !sidebarOpen && 'ml-[-100%] md:ml-[-23rem]',
      )}
    >
      <div className="flex flex-1">
        <div className="flex space-y-2 w-[3.5rem] flex-col justify-center items-center border-r border-divider">
          <Tooltip
            content="Conversations"
            placement="right"
            className="bg-background"
          >
            <Button
              isIconOnly
              onPress={() => setTab('CONVERSATIONS')}
              color={tab === 'CONVERSATIONS' ? 'primary' : 'default'}
            >
              <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
            </Button>
          </Tooltip>

          <Tooltip
            content="Recieved invitations"
            placement="right"
            className="bg-background"
          >
            <Button
              isIconOnly
              onPress={() => setTab('RECIEVED_INVITATIONS')}
              color={tab === 'RECIEVED_INVITATIONS' ? 'primary' : 'default'}
            >
              <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
            </Button>
          </Tooltip>
          <Tooltip
            content="Sent invitations"
            placement="right"
            className="bg-background"
          >
            <Button
              isIconOnly
              onPress={() => setTab('SENT_INVITATIONS')}
              color={tab === 'SENT_INVITATIONS' ? 'primary' : 'default'}
            >
              <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
            </Button>
          </Tooltip>
        </div>
        <div className="flex flex-col flex-1">{renderContent()}</div>
      </div>
    </div>
  );
}
