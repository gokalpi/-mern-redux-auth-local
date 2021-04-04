import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ConfirmModal from '../../components/ConfirmModal';
import { deleteUser, getUsers, usersSelector } from '../user/user.slice';

function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const [showModal, setModalVisibility] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const showConfirmModal = () => {
    setModalVisibility(true);
  };

  const confirmDelete = (id) => {
    console.log('confirmDelete - id', id);
    setModalVisibility(false);
  };

  return (
    <>
      <table className='table table-hover table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className='text-end' style={{ whiteSpace: 'nowrap' }}>
                  <Link to={`edit/${user.id}`} className='btn btn-sm btn-primary me-2'>
                    Edit
                  </Link>
                  <button
                    data-bs-toggle='modal'
                    className='btn btn-sm btn-danger'
                    onClick={() => showConfirmModal(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <ConfirmModal
          content='Are you sure you want to delete this user?'
          onOK={confirmDelete}
          title='User Deletion Confirmation'
        />
      )}
    </>
  );
}

export default UsersPage;
