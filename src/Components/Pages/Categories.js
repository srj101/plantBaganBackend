import React, { useEffect, useState } from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';

const GET_CATEGORIES = gql`
query getCategories {
  getCategories {
    id
    name
    image
    description
  }
}
`;

const DELETE_CATEGORY = gql`
mutation($deleteCategoryId: String!) {
  deleteCategory(id: $deleteCategoryId)
}
`;

function Categories() {

  const { loading, error, data ,refetch} = useQuery(GET_CATEGORIES);
  const [deleteCategory, { dataa, loadingg, errorr }] = useMutation(DELETE_CATEGORY);

  if (loading || loadingg) return <p>Loading...</p>;
  if (error ) return <p>{error.message}</p>;

  return (
    <div className='categories_page'>
        <button type="button" class="btn btn-light mt-4"><Link to="/categories/create">Add new Category</Link></button>
        <figure class="text-center">
            <blockquote class="blockquote">
                <p><b>Category List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Add Update Delete Categories</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>DELETE</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    data?.getCategories?.map(cat => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>{cat.image}</td>
                            <td>{cat.description}</td>
                            
                            <td className='deletebutton' onClick={async(e)=>
                            {  await deleteCategory({
                                variables: {
                                  deleteCategoryId: cat.id
                                }})
                                window.location.reload(false)
                                }}>X</td>
                                <td className='editbutton'><Link to={`edit/${cat.id}`} key={cat.id}>Edit</Link></td>
                        </tr>
                        
                    ))
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default Categories