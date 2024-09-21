import { Avatar, Card, CardBody, cn } from '@nextui-org/react';
import { components } from '../__generated__/schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ChatLayoutContext } from '../context/chat-layout-context';

interface Props {
  conversation: components['schemas']['ConversationDTO'];
}

export default function ConversationItem({ conversation }: Props) {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const { setSidebarOpen } = useContext(ChatLayoutContext);

  const getUser = () => {
    const conversationUser = conversation.conversationUsers[0];
    if (!conversationUser) {
      return;
    }
    return conversationUser.user;
  };

  return (
    <Card
      isPressable
      shadow="none"
      className={cn(conversationId === conversation.id && 'bg-background-100')}
      onPress={() => {
        navigate(`/chat/conversation/${conversation.id}`);
        setSidebarOpen(false);
      }}
    >
      <CardBody className="flex">
        <div className="flex items-center space-x-3">
          <Avatar
            src={getUser()?.profilePicture}
            imgProps={{ referrerPolicy: 'no-referrer' }}
          />
          <div className="flex flex-1">{getUser()?.username}</div>
        </div>
      </CardBody>
    </Card>
  );
}
