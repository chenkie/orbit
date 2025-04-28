import React, { useContext, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import Card from '../components/common/Card';
import { FetchContext } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';

const Account = () => {
  const fetchContext = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const setUserRole = async role => {
    try {
      const { data } = await fetchContext.authAxios.patch(
        'user-role',
        {
          role
        }
      );
      setSuccessMessage(data.message);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <>
      <PageTitle title="Account" />
      <Card>
        <p className="font-bold">User Role</p>
        <div className="mt-4">
          <p>Select a role for yourself</p>
          <div className="mt-2 flex">
            <select
              defaultValue={auth.authState.userInfo.role}
              onChange={e => setUserRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {successMessage && (
              <p className="text-green-700 ml-4">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 ml-4">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Account;
