import { components } from '../__generated__/schema';

const INCOMING_MESSAGE: components['schemas']['IncomingMessageEvent']['messageType'] =
  'INCOMING_MESSAGE';
const CONVERSATIONS_UPDATED: components['schemas']['ConversationsUpdatedEvent']['messageType'] =
  'CONVERSATIONS_UPDATED';
const INVITATIONS_UPDATED: components['schemas']['InvitationsUpdatedEvent']['messageType'] =
  'INVITATIONS_UPDATED';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClientToServerEvents {}

export interface ServerToClientEvents {
  [INCOMING_MESSAGE]: (
    payload: components['schemas']['IncomingMessageEvent']['dtoPayload'],
  ) => void;

  [CONVERSATIONS_UPDATED]: () => void;

  [INVITATIONS_UPDATED]: () => void;
}
