import React,{useEffect} from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';

const GET_COMMENTS = gql`
  query{
    getComments {
      id
      name
      newsId
      Comment
      email
    }
  }
`;

const DELETE_COMMENT = gql`

mutation($deleteCommentId: String!) {
  deleteComment(id: $deleteCommentId)
}
`;

function Comments() {
  const { loading, error, data } = useQuery(GET_COMMENTS);
  const [deleteComment, deletedComment] = useMutation(DELETE_COMMENT);

  if (loading || deletedComment.loading) return <p>Loading...</p>;
    if(error) return <p>{error.message}</p>
    if(deletedComment.error) return <p>{deletedComment.error.message}</p>

  return (
    <div className='comments_page'>
        <figure class="text-center">
            <blockquote class="blockquote">
                <p><b>Comments List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Read and Delete Comments</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>News ID</th>
                    <th>Comment</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    data?.getComments?.map(comment => (
                        <tr>
                            <td>{comment.id}</td>
                            <td>{comment.name}</td>
                            <td>{comment.email}</td>
                            <td>{comment.newsId}</td>
                            <td>{comment.Comment}</td>
                            
                            <td className='deletebutton' onClick={async(e)=>
                            {   await deleteComment({
                                variables: {
                                  deleteCommentId: comment.id
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

export default Comments