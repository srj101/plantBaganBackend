import React, { useEffect, useState } from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';

const GET_REVIEWS = gql`
query {
  allReviews {
    id
    name
    rating
    type
    Rimage
    email
    Comment
    plantOrCourseId
  }
}

`;


const DELETE_REVIEW = gql`
mutation deleteReview($deleteReviewPlantOrCourseId: String!, $deleteReviewId: String!){
  deleteReview(plantOrCourseId: $deleteReviewPlantOrCourseId, id: $deleteReviewId)
}
`;

function Reviews() {
  const { loading, error, data ,refetch} = useQuery(GET_REVIEWS);
  const [deleteReview, { dataa, loadingg, errorr }] = useMutation(DELETE_REVIEW);
  if (loading ) return <p>Loading...</p>;
    if (error ) return <p>{error.message}</p>;
  return (
    <div className='categories_page'>
        
        <figure class="text-center">
            <blockquote class="blockquote">
                <p><b>Review List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Add Update Delete Reviews</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Type</th>
                    <th>Plant/Course ID</th>
                    <th>Profile Image</th>
                    <th>Comment</th>
                    <th>Email</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                
            {
              data?.allReviews?.map(review => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.name}</td>
                  <td>{Array(review.rating)
              .fill(1)
              .map((el, i) => (
                <span>⭐</span>
              ))}
                    </td>
                  <td>{review.type}</td>
                  <td>{review.plantOrCourseId}</td>
                  <td>{review.Rimage}</td>
                  <td>{review.comment}</td>
                  <td>{review.email}</td>
                  <td className='deletebutton' onClick={async(e)=>
                            {  await deleteReview({
                                variables: {
                                  deleteReviewPlantOrCourseId: review.plantOrCourseId,
                                  deleteReviewId:review.id
                                }})
                                window.location.reload(false)
                                }}>X</td>
                </tr>
                
              ))
            }
                
            </tbody>
        </table>
    </div>
  )
}

export default Reviews