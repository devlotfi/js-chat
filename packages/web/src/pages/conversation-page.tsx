import { useParams } from 'react-router-dom';
import { $api, fetchClient, InMemoryStore } from '../openapi-client';
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
import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserFromConversation } from '../utils';

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

  const { mutate, isPending } = $api.useMutation(
    'post',
    '/messages/{conversationId}',
    {
      onSuccess() {
        resetForm();
      },
    },
  );

  const fetchMessages = async (conversationId: string, cursor?: string) => {
    const { data } = await fetchClient.GET('/messages/{conversationId}', {
      params: {
        path: {
          conversationId,
        },
        query: {
          cursor,
        },
      },
      headers: {
        authorization: `Bearer ${InMemoryStore.accessToken}`,
      },
    });
    return data!;
  };

  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    isFetchingPreviousPage,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['messages', conversationId],
    queryFn: async ({ pageParam }) =>
      await fetchMessages(
        conversationId,
        pageParam === '' ? undefined : pageParam,
      ),
    initialPageParam: '',
    getPreviousPageParam: (firstPage) => {
      if (!firstPage.length) {
        return undefined;
      }

      return firstPage[firstPage.length - 1].id;
    },
    getNextPageParam: () => undefined,
    refetchOnWindowFocus: false,
    networkMode: 'online',
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

  const renderMessages = () => {
    return messagesData.pages.map((page, index) => (
      <div key={index} className="flex flex-col-reverse">
        {page.map((message) => (
          <MessageItem key={message.id} message={message}></MessageItem>
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col flex-1 bg-background-100">
      <div className="flex justify-between border-b border-divider p-[0.5rem] bg-background">
        <div className="flex items-center space-x-2">
          <Avatar
            src={getUserFromConversation(conversationData).profilePicture}
            size="sm"
            imgProps={{ referrerPolicy: 'no-referrer' }}
          ></Avatar>
          <div className="flex">
            {getUserFromConversation(conversationData).username}
          </div>
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
      <ScrollShadow className="flex flex-col flex-1 overscroll-y-auto pb-[3rem]">
        <div className="flex justify-center py-[1rem]">
          {hasPreviousPage ? (
            <Button
              onPress={() => {
                (async () => {
                  await fetchPreviousPage();
                })();
              }}
              isLoading={isFetchingPreviousPage}
              startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
            >
              Show more
            </Button>
          ) : null}
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
