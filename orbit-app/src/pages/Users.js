import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import PageTitle from '../components/common/PageTitle';
import { FetchContext } from '../context/FetchContext';
import Card from '../components/common/Card';
import defaultAvatar from './../images/defaultAvatar.png';

const UserDetailLabel = ({ text }) => (
  <p className="mt-2 uppercase font-bold text-gray-500 text-xs">
    {text}
  </p>
);
const UserDetail = ({ user }) => (
  <Card>
    <div className="flex">
      <div className="w-24">
        <img
          src={user.avatar || defaultAvatar}
          alt="avatar"
        />
      </div>

      <div>
        <p className="font-bold text-lg">
          {user.firstName} {user.lastName}
        </p>

        <div className="mt-2">
          <UserDetailLabel text="Bio" />
          {user.bio ? (
            <div
              dangerouslySetInnerHTML={{ __html: user.bio }}
            />
          ) : (
            <p className="text-gray-500 italic">
              No bio set
            </p>
          )}
        </div>
      </div>
    </div>
  </Card>
);

const Users = () => {
  const fetchContext = useContext(FetchContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'users'
        );
        setUsers(data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [fetchContext.authAxios]);

  return (
    <>
      <PageTitle title="Users" />
      <div className="flex flex-col">
        {!!users.length &&
          users.map(user => (
            <div className="m-2">
              <UserDetail key={user._id} user={user} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Users;
