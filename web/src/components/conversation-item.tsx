import { Avatar, Button, cn } from '@nextui-org/react';
import { components } from '../__generated__/schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ChatContext } from '../context/chat-context';

interface Props {
  conversation: components['schemas']['ConversationDTO'];
}

export default function ConversationItem({ conversation }: Props) {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const { setSidebarOpen } = useContext(ChatContext);

  const getUser = () => {
    const conversationUser = conversation.conversationUsers[0];
    if (!conversationUser) {
      return;
    }
    return conversationUser.user;
  };

  return (
    <Button
      className={cn('h-[4rem]')}
      onPress={() => {
        navigate(`/chat/conversation/${conversation.id}`);
        setSidebarOpen(false);
      }}
      variant={conversationId === conversation.id ? 'flat' : 'solid'}
      color={conversationId === conversation.id ? 'primary' : 'default'}
    >
      <div className="flex flex-1 items-center space-x-3">
        <Avatar
          src={getUser()?.profilePicture}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        />
        <div className="flex flex-1">{getUser()?.username}</div>
      </div>
    </Button>
  );
}
