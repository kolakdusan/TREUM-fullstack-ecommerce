import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Message from './../../components/Message'
import Loader from './../../components/Loader'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice'

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery()

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await deleteUser(userId)
        if (res.error?.status === 400) {
          toast.error('Cannot delete admin user.')
        } else {
          toast.success('User deleted successfully.')
          refetch()
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <h1>Users</h1>

      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm" variant="light">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    style={{ color: 'white' }}
                    onClick={() => {
                      deleteHandler(user._id)
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default UserListScreen
