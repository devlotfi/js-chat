import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from '@nextui-org/react';
import { $api } from '../../openapi-client';
import InvitationItem from './invitation-item';
import Empty from '../../assets/svg/empty.svg';

export default function RecievedInvitationsList() {
  const { data, isLoading } = $api.useQuery('get', '/invitations/recieved');

  if (isLoading || !data) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner color="primary" size="lg"></Spinner>
      </div>
    );
  }

  const renderList = () => {
    if (data.length > 0) {
      return data.map((invitation) => (
        <InvitationItem
          key={invitation.id}
          invitation={invitation}
          mode="RECIEVED"
        ></InvitationItem>
      ));
    }
    return (
      <div className="flex flex-1 flex-col space-y-3 items-center justify-center">
        <img className="h-[8rem]" src={Empty} alt="empty" />
        <div className="flex">No results</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 p-[1rem]">
      <div className="flex items-center space-x-3 text-[15pt] font-bold mb-[1rem] ml-[0.5rem]">
        <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
        <div className="flex">Recieved invitations</div>
      </div>

      <div className="flex flex-col flex-1 space-y-3">{renderList()}</div>
    </div>
  );
}
