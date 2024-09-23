import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { $api } from '../../openapi-client';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function DeleteConversationModal({
  isOpen,
  onOpenChange,
}: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { conversationId } = useParams();

  if (!conversationId) {
    throw new Error('No conversation id');
  }

  const { mutate, isPending } = $api.useMutation(
    'delete',
    '/conversations/{conversationId}',
    {
      onSuccess() {
        queryClient.resetQueries({
          queryKey: ['get', '/conversations'],
        });
        queryClient.resetQueries({
          queryKey: ['get', '/users'],
          exact: false,
        });
        queryClient.resetQueries({
          queryKey: ['get', '/invitations/sent'],
        });
        queryClient.resetQueries({
          queryKey: ['get', '/invitations/recieved'],
        });
        navigate('/chat');
      },
    },
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete conversation confirmation
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this conversation ?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isPending}
                color="danger"
                onPress={() =>
                  mutate({
                    params: {
                      path: {
                        conversationId,
                      },
                    },
                  })
                }
              >
                Sign out
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
