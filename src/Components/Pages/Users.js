import React,{useEffect} from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';
import { message } from 'antd';
const GET_USERS = gql`
query allUsers {
  allUsers {
    id
    userType
    role
    fullName
    password
    email
    profilepic
    confirm
  }
}
`;

const DELETE_USER = gql`
mutation deleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId)
}
`;


function Users() {
  const { loading, error, data ,refetch} = useQuery(GET_USERS);
  const [deleteUser, deletedUser] = useMutation(DELETE_USER);

    if (loading || deletedUser.loading) return <p>Loading...</p>;
    if (error ) return <p>{error.message}</p>;
    if (deletedUser.error) return message.error(deletedUser.error.message)

  return (
    <div className='plants_page'>
        <figure class="text-center">
            <blockquote class="blockquote">
                <p><b>User Management</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Update Delete Users</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Role</th>
                    <th>Full Name</th>
                    <th>Password</th>
                    <th>Profile Image</th>
                    <th>Email Confirmed</th>
                    <th>DELETE</th>
                    <th>EDIT</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    data?.allUsers?.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.userType}</td>
                            <td>{user.role}</td>
                            <td>{user.fullName}</td>
                            <td>{user.password}</td>
                            <td>{user.profilePic}</td>
                            <td>{user.confirm? `Yes`:`No`}</td>
                          
                            <td className='deletebutton' onClick={async(e)=>
                            {   await deleteUser({
                                variables: {
                                  deleteUserId: user.id
                                }})
                                window.location.reload(false)
                                }}>X</td>
                                <td className='editbutton'><Link to={`edit/${user.id}`} key={user.id}>Edit</Link></td>
                        </tr>
                        
                    ))
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default Users