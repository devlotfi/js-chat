import { faSearch, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Spinner } from '@nextui-org/react';
import { $api } from '../openapi-client';
import UserListItem from './user-list-item';

export default function UserSearch() {
  const { data, isLoading } = $api.useQuery('get', '/users', {
    params: {
      query: {
        search: '',
        cursor: '',
      },
    },
  });

  if (isLoading || !data) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner color="primary" size="lg"></Spinner>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col p-[1rem]">
      <div className="flex items-center space-x-3 text-[15pt] font-bold mb-[1rem] ml-[0.5rem]">
        <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
        <div className="flex">Search users</div>
      </div>

      <Input
        className="mb-[1rem]"
        label="Search"
        placeholder="Search users"
        type="text"
        startContent={<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>}
      ></Input>
      <div className="flex flex-col flex-1">
        {data.map((user) => (
          <UserListItem key={user.id} user={user}></UserListItem>
        ))}
      </div>
    </div>
  );
}
