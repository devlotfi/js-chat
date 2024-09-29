import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { $api } from '../../openapi-client';
import { Spinner } from '@nextui-org/react';
import ConversationItem from './conversation-item';

export default function ConversationList() {
  const { data, isLoading, isError, error } = $api.useQuery(
    'get',
    '/conversations',
  );

  if (isLoading || !data) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner color="primary" size="lg"></Spinner>
      </div>
    );
  }

  if (isError) {
    return JSON.stringify(error);
  }

  return (
    <div className="flex flex-col flex-1 p-[1rem]">
      <div className="flex items-center space-x-3 text-[15pt] font-bold mb-[1rem] ml-[0.5rem]">
        <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
        <div className="flex">Conversations</div>
      </div>

      {data.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
        ></ConversationItem>
      ))}
    </div>
  );
}
