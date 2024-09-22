import { components } from '../__generated__/schema';

const SEND_MESSAGE: components['schemas']['SendMessageEvent']['messageType'] =
  'SEND_MESSAGE';
const INCOMING_MESSAGE: components['schemas']['IncomingMessageEvent']['messageType'] =
  'INCOMING_MESSAGE';

export interface ClientToServerEvents {
  [SEND_MESSAGE]: (
    payload: components['schemas']['SendMessageEvent']['dtoPayload'],
    callback: (
      responsePayload: components['schemas']['SendMessageEvent']['responsePayload'],
    ) => void,
  ) => void;
}
export interface ServerToClientEvents {
  [INCOMING_MESSAGE]: (
    payload: components['schemas']['IncomingMessageEvent']['dtoPayload'],
  ) => void;
}
