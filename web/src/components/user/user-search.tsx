import { faSearch, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Spinner } from '@nextui-org/react';
import { $api } from '../../openapi-client';
import UserListItem from './user-list-item';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Empty from '../../assets/svg/empty.svg';

const validationSchema = yup.object({
  search: yup.string(),
});

export default function UserSearch() {
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema,
    onSubmit() {},
  });

  const { data, isLoading } = $api.useQuery('get', '/users', {
    params: {
      query: {
        search: values.search,
        cursor: '',
      },
    },
  });

  const renderList = () => {
    if (isLoading || !data) {
      return (
        <div className="flex flex-1 justify-center items-center">
          <Spinner color="primary" size="lg"></Spinner>
        </div>
      );
    } else {
      if (data.length > 0) {
        return data.map((user) => (
          <UserListItem key={user.id} user={user}></UserListItem>
        ));
      }
      return (
        <div className="flex flex-1 flex-col space-y-3 items-center justify-center">
          <img className="h-[8rem]" src={Empty} alt="empty" />
          <div className="flex">No results</div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-1 flex-col p-[1rem]">
      <div className="flex items-center space-x-3 text-[15pt] font-bold mb-[1rem] ml-[0.5rem]">
        <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
        <div className="flex">Search users</div>
      </div>

      <form className="flex" onSubmit={handleSubmit}>
        <Input
          name="search"
          value={values.search}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mb-[1rem]"
          label="Search"
          placeholder="Search users"
          type="text"
          startContent={<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>}
        ></Input>
      </form>
      <div className="flex flex-col flex-1">{renderList()}</div>
    </div>
  );
}
