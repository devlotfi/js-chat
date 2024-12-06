import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { $api, InMemoryStore } from '../../openapi-client';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function SignOutModal({ isOpen, onOpenChange }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = $api.useMutation('post', '/auth/sign-out', {
    onSuccess() {
      InMemoryStore.accessToken = undefined;
      queryClient.resetQueries({
        queryKey: ['get', '/auth/sign-in/refresh-token'],
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Sign out confirmation
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to sign out ?</p>
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
                    credentials: 'include',
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
