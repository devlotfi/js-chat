import ChooseConversationSVG from '../assets/svg/choose-conversation.svg';

export default function ChooseConversation() {
  return (
    <div className="flex flex-1 flex-col bg-background-100 justify-center items-center space-y-3">
      <img
        className="h-[10rem]"
        src={ChooseConversationSVG}
        alt="choose-conversation"
      />
      <div className="flex text-[13pt]">
        Choose a conversation to get started
      </div>
    </div>
  );
}
