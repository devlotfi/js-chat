import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ConversationList() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center space-x-3 text-[15pt] font-bold p-[1rem]">
        <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
        <div className="flex">Messages</div>
      </div>
    </div>
  );
}
