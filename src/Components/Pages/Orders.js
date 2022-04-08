import React, { useEffect, useState } from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';

const GET_ORDERS = gql`
  query {
  gerOrders{
    id
    city
    cname
    country
    district
    email
    fname
    lname
    notes
    phone
    postCode
    saddress
    type
    plantOrCourseId
    completed
    trackingID
    status
  }
}
`;

const DELETE_ORDER = gql`
mutation($deleteOrderId: String!) {
  deleteOrder(id: $deleteOrderId)
}
`;

function Orders() {
  const { loading, error, data ,refetch} = useQuery(GET_ORDERS);
  const [deleteOrder, deletedOrder] = useMutation(DELETE_ORDER);

  if (loading || deletedOrder.loading) return <p>Loading...</p>;
  if (error ) return <p>{error.message}</p>;
  if (deletedOrder.error ) return <p>{deletedOrder.error.message}</p>;
  return (
    <div className='orders_page'>
        <figure class="text-center">
        
            <blockquote class="blockquote">
                <p><b>Order List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Update Delete Orders</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>City</th>
                    <th>Company Name</th>
                    <th>Country</th>
                    <th>District</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Notes</th>
                    <th>Phone</th>
                    <th>Post Code</th>
                    <th>Street Address</th>
                    <th>Type</th>
                    <th>Product ID</th>
                    <th>Completed</th>
                    <th>Tracking id</th>
                    <th>Status</th>
                    <th>DELETE</th>
                    <th>EDIT</th>
                </tr>
            </thead>
            <tbody>
                
            {
              data?.gerOrders?.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.city}</td>
                  <td>{order.cname}</td>
                  <td>{order.country}</td>
                  <td>{order.district}</td>
                  <td>{order.email}</td>
                  <td>{order.fname}</td>
                  <td>{order.lname}</td>
                  <td>{order.notes}</td>
                  <td>{order.phone}</td>
                  <td>{order.postCode}</td>
                  <td>{order.saddress}</td>
                  <td>{order.type}</td>
                  <td>{order.plantOrCourseId}</td>
                  <th>{order.completed? 'Yes' : 'No'}</th>
                  <td>{order.trackingID}</td>
                  <td>{order.status}</td>
                  <td className='deletebutton' onClick={async(e)=>
                            {  await deleteOrder({
                                variables: {
                                  deleteOrderId: order.id
                                }})
                                window.location.reload(false)
                                }}>X</td>
                  <td className='editbutton'><Link to={`edit/${order.id}`} key={order.id}>Edit</Link></td>
                </tr>
                
              ))
            }
                
            </tbody>
        </table>
    </div>
  )
}

export default Orders