import { Avatar, Button, Card, CardBody, cn, Spinner } from '@nextui-org/react';
import { components } from '../../__generated__/schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faEnvelope,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { $api } from '../../openapi-client';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  user: components['schemas']['UserPublicDTO'];
}

export default function UserListItem({ user }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading } = $api.useQuery(
    'get',
    '/users/{userId}/status',
    {
      params: {
        path: {
          userId: user.id,
        },
      },
    },
    {
      networkMode: 'online',
    },
  );

  const { mutate: mutateSendInvitation, isPending: isPendingSendInvitation } =
    $api.useMutation('post', '/invitations/{userId}', {
      onSuccess() {
        queryClient.resetQueries({
          queryKey: [
            'get',
            '/users/{userId}/status',
            {
              params: {
                path: {
                  userId: user.id,
                },
              },
            },
          ],
        });
      },
    });

  return (
    <Card shadow="none" className="bg-default !transition-all duration-300">
      <CardBody className="flex flex-col justify-center overflow-hidden">
        {isLoading || !data ? (
          <div className="flex flex-1 justify-center items-center">
            <Spinner color="primary" size="sm"></Spinner>
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <div className="flex flex-1 items-center space-x-3">
                <Avatar
                  size="sm"
                  src={user.profilePicture}
                  imgProps={{ referrerPolicy: 'no-referrer' }}
                />
                <div className="flex flex-1">{user.username}</div>
              </div>

              <div className="flex">
                {(!data.invitationRecieved &&
                  !data.invitationSent &&
                  !data.conversation) ||
                data.invitationSent ||
                data.invitationRecieved ? (
                  <Button
                    onPress={() => setOpen(!open)}
                    size="sm"
                    isIconOnly
                    className="bg-default-100"
                  >
                    <FontAwesomeIcon
                      className={cn('duration-300', open && 'rotate-180')}
                      icon={faCaretDown}
                    ></FontAwesomeIcon>
                  </Button>
                ) : null}
              </div>
            </div>

            {open ? (
              <div className="flex flex-col mt-[1rem] space-y-3">
                {!data.invitationRecieved &&
                !data.invitationSent &&
                !data.conversation ? (
                  <Button
                    onPress={() =>
                      mutateSendInvitation({
                        params: {
                          path: {
                            userId: user.id,
                          },
                        },
                      })
                    }
                    isLoading={isPendingSendInvitation}
                    size="sm"
                    color="primary"
                    startContent={
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    }
                  >
                    Invite user
                  </Button>
                ) : null}

                {data.invitationSent || data.invitationRecieved ? (
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    <div className="flex">Waiting for acceptation</div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </CardBody>
    </Card>
  );
}
