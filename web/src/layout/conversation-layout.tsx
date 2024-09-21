import { useParams } from 'react-router-dom';
import { $api } from '../openapi-client';
import { Spinner } from '@nextui-org/react';

export default function ConversationLayout() {
  const { conversationId } = useParams();
  if (!conversationId) {
    return 'Error';
  }

  const { data, isLoading, isError } = $api.useQuery(
    'get',
    '/messages/{conversationId}',
    {
      params: {
        path: {
          conversationId,
        },
      },
    },
  );

  if (isLoading || !data) {
    return (
      <div className="flex flex-1 bg-background-100 justify-center items-center">
        <Spinner color="primary" size="lg"></Spinner>
      </div>
    );
  }

  return (
    <div className="flex flex-1 bg-background-100">
      <h1>conversation {conversationId}</h1>
    </div>
  );
}
