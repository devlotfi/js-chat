import { Avatar, cn } from '@nextui-org/react';
import { components } from '../../__generated__/schema';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

interface Props {
  message: components['schemas']['MessageDTO'];
}

export default function MessageItem({ message }: Props) {
  const { user } = useContext(AuthContext);

  if (!user) {
    throw new Error('No user');
  }

  const formatZero = (value: number) => (value < 10 ? `0${value}` : value);

  const formatDate = () => {
    const date = new Date(message.createdAt);
    return `${date.getFullYear()}/${formatZero(date.getMonth() + 1)}/${formatZero(date.getDate())} ${formatZero(date.getHours())}:${formatZero(date.getMinutes())}`;
  };

  return (
    <div
      className={cn(
        'flex p-[0.7rem]',
        message.user.id === user.id && 'flex-row-reverse',
      )}
    >
      <div
        className={cn(
          'flex items-center space-x-2',
          message.user.id === user.id && 'flex-row-reverse space-x-reverse',
        )}
      >
        <Avatar
          src={message.user.profilePicture}
          color="primary"
          isBordered={message.user.id === user.id}
          imgProps={{ referrerPolicy: 'no-referrer' }}
          size="sm"
        ></Avatar>
        <div
          className={cn(
            'flex bg-background border border-divider px-[0.5rem] py-[0.3rem] rounded-lg',
            message.user.id === user.id && 'bg-primary text-primary-foreground',
          )}
        >
          {message.text}
        </div>
        <div className="flex opacity-50 text-[9pt]">{formatDate()}</div>
      </div>
    </div>
  );
}
