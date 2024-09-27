import { useParams } from 'react-router-dom';
import { $api } from '../openapi-client';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  ScrollShadow,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faPaperPlane,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import MessageItem from '../components/message/message-item';
import * as yup from 'yup';
import { useFormik } from 'formik';
import DeleteConversationModal from '../components/conversation/delete-conversation-modal';
import { QueryFunctionContext, useInfiniteQuery, useQuery } from '@tanstack/react-query';

const validationSchema = yup.object({
  text: yup.string().max(512).required(),
});

export default function ConversationPage() {
  const { conversationId } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!conversationId) {
    throw new Error('No conversation id');
  }

  const { values, handleChange, handleBlur, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        text: '',
      },
      validationSchema,
      onSubmit(values) {
        mutate({
          params: {
            path: {
              conversationId,
            },
          },
          body: {
            text: values.text,
          },
        });
      },
    });

  if (!conversationId) {
    throw new Error();
  }

  const { mutate, mutateAsync, isPending } = $api.useMutation(
    'post',
    '/messages/{conversationId}',
    {
      onSuccess() {
        resetForm();
      },
    },
  );

  const { data: messagesData, isLoading: isMessagesLoading } = $api.useQuery(
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

  

  const {} = useQuery({
    queryKey: ["lol"],
    queryFn: async (input: QueryFunctionContext<[string]>) => {
      return []
    }
  });

  const { data: conversationData, isLoading: isConversationLoading } =
    $api.useQuery('get', '/conversations/{conversationId}', {
      params: {
        path: {
          conversationId,
        },
      },
    });

  if (
    isMessagesLoading ||
    isConversationLoading ||
    !messagesData ||
    !conversationData
  ) {
    return (
      <div className="flex flex-1 bg-background-100 justify-center items-center">
        <Spinner color="primary" size="lg"></Spinner>
      </div>
    );
  }

  const getUser = () => {
    const conversationUser = conversationData.conversationUsers[0];
    if (!conversationUser) {
      return;
    }
    return conversationUser.user;
  };

  const renderMessages = () => {
    return messagesData.map((message) => (
      <MessageItem key={message.id} message={message}></MessageItem>
    ));
  };

  return (
    <div className="flex flex-col flex-1 bg-background-100">
      <div className="flex justify-between border-b border-divider p-[0.5rem] bg-background">
        <div className="flex items-center space-x-2">
          <Avatar
            src={getUser()?.profilePicture}
            size="sm"
            imgProps={{ referrerPolicy: 'no-referrer' }}
          ></Avatar>
          <div className="flex">{getUser()?.username}</div>
        </div>
        <div className="flex">
          <DeleteConversationModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          ></DeleteConversationModal>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly>
                <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                switch (key) {
                  case 'delete-conversation':
                    onOpen();
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              <DropdownItem
                key="delete-conversation"
                className="text-danger"
                color="danger"
                startContent={
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                }
              >
                Delete conversation
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <ScrollShadow className="flex flex-col flex-1 overscroll-y-auto">
        <div className="flex justify-center py-[1rem]">
          <Button
            onPress={() => {
              (async () => {
                await mutateAsync({});
              })();
            }}
            startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
          >
            Show more
          </Button>
        </div>
        {renderMessages()}
      </ScrollShadow>
      <form
        onSubmit={handleSubmit}
        className="flex border-t border-divider p-[0.5rem] space-x-2 bg-background"
      >
        <Input
          name="text"
          type="text"
          placeholder="Message..."
          className="border-divider"
          value={values.text}
          onChange={handleChange}
          onBlur={handleBlur}
        ></Input>

        <Button type="submit" color="primary" isIconOnly isLoading={isPending}>
          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
        </Button>
      </form>
    </div>
  );
}
