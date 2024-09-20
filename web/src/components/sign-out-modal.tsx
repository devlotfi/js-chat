import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { $api } from '../openapi-client';
import { Constants } from '../constants';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function SignOutModal({ isOpen, onOpenChange }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = $api.useMutation('post', '/auth/sign-out', {
    onSuccess() {
      console.log('success');

      sessionStorage.removeItem(Constants.ACCESS_TOKEN_STORAGE_KEY);
      queryClient.resetQueries({
        queryKey: ['get', '/auth/sign-in/refresh-token'],
      });
    },
  });

  return (
    <Modal
      className="bg-background"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
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
