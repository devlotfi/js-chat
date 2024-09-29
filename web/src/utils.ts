import { components } from './__generated__/schema';

export const getUserFromConversation = (
  conversation: components['schemas']['ConversationDTO'],
) => {
  const conversationUser = conversation.conversationUsers[0];
  if (!conversationUser) {
    throw new Error('Invalid conversation');
  }
  return conversationUser.user;
};
