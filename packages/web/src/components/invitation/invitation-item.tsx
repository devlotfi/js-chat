import { Avatar, Button, Card, CardBody } from '@nextui-org/react';
import { components } from '../../__generated__/schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { $api } from '../../openapi-client';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  invitation: components['schemas']['InvitationDTO'];
  mode: 'SENT' | 'RECIEVED';
}

export default function InvitationItem({ invitation, mode }: Props) {
  const queryClient = useQueryClient();

  const {
    mutate: mutateAcceptInvitation,
    isPending: isPendingAcceptInvitation,
  } = $api.useMutation('patch', '/invitations/{invitationId}', {
    onSuccess() {
      queryClient.resetQueries({
        queryKey: ['get', '/invitations/recieved'],
      });
      queryClient.resetQueries({
        queryKey: ['get', '/conversations'],
      });
    },
  });

  const {
    mutate: mutateDeleteInvitation,
    isPending: isPendingDeleteInvitation,
  } = $api.useMutation('delete', '/invitations/{invitationId}', {
    onSuccess() {
      queryClient.resetQueries({
        queryKey: ['get', '/invitations/recieved'],
      });
      queryClient.resetQueries({
        queryKey: ['get', '/invitations/sent'],
      });
    },
  });

  return (
    <Card shadow="none" className="bg-default !transition-all duration-300">
      <CardBody className="flex flex-col justify-center overflow-hidden">
        <div className="flex items-center">
          <div className="flex flex-1 items-center space-x-3">
            <Avatar
              size="sm"
              src={
                mode === 'RECIEVED'
                  ? invitation.fromUser.profilePicture
                  : invitation.toUser.profilePicture
              }
              imgProps={{ referrerPolicy: 'no-referrer' }}
            />
            <div className="flex flex-1">
              {mode === 'RECIEVED'
                ? invitation.fromUser.username
                : invitation.toUser.username}
            </div>
          </div>
        </div>

        <div className={'flex mt-[1rem] space-x-2'}>
          {mode === 'RECIEVED' ? (
            <Button
              size="sm"
              color="primary"
              className="flex flex-1"
              startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              onPress={() =>
                mutateAcceptInvitation({
                  params: {
                    path: {
                      invitationId: invitation.id,
                    },
                  },
                })
              }
              isLoading={isPendingAcceptInvitation}
            >
              Accept
            </Button>
          ) : null}
          <Button
            size="sm"
            color="danger"
            className="flex flex-1"
            startContent={<FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>}
            onPress={() =>
              mutateDeleteInvitation({
                params: {
                  path: {
                    invitationId: invitation.id,
                  },
                },
              })
            }
            isLoading={isPendingDeleteInvitation}
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
