import { useContext, useState } from 'react';
import { ChatContext } from '../context/chat-context';
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
  const { sidebarOpen } = useContext(ChatContext);
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
        'flex max-h-[calc(100vh-3.3rem)] h-full lg:h-auto w-full md:w-[23rem] overflow-x-hidden absolute lg:flex lg:static bg-background duration-300',
        !sidebarOpen && 'ml-[-100%] md:ml-[-23rem]',
      )}
    >
      <div className="flex flex-1">
        <div className="flex space-y-2 w-[3.5rem] flex-col justify-center items-center border-r border-divider">
          <Tooltip content="Conversations" placement="right">
            <Button
              isIconOnly
              onPress={() => setTab('CONVERSATIONS')}
              color={tab === 'CONVERSATIONS' ? 'primary' : 'default'}
            >
              <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
            </Button>
          </Tooltip>

          <Tooltip content="Recieved invitations" placement="right">
            <Button
              isIconOnly
              onPress={() => setTab('RECIEVED_INVITATIONS')}
              color={tab === 'RECIEVED_INVITATIONS' ? 'primary' : 'default'}
            >
              <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
            </Button>
          </Tooltip>
          <Tooltip content="Sent invitations" placement="right">
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