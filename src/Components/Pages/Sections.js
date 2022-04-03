import React, { useEffect, useState } from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';

const ALL_SECTIONS = gql`
query{
  allSections {
    id
    title
    shortDescription
    courseId
  }
}
`;

const DELETE_SECTION = gql`
mutation deleteSection($deleteSectionId: String!, $deleteSectionCourseId: String!) {
  deleteSection(id: $deleteSectionId, courseId: $deleteSectionCourseId)
}
`;

function Sections() {
  const { loading, error, data ,refetch} = useQuery(ALL_SECTIONS);
  const [deleteSection, deletedSection] = useMutation(DELETE_SECTION);

  if (loading ) return <p>Loading...</p>;
    if (error ) return <p>{error.message}</p>;
    if(deletedSection.error) return <p>{deletedSection.error.message}</p>
  return (
    <div className='sections_page'>
        <button type="button" class="btn btn-light mt-4"><Link to="/sections/create">Add new Section</Link></button>
        <figure class="text-center">
            <blockquote class="blockquote">
                <p><b>Section List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Add Update Delete Sections</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Course ID</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
                
            {
              data?.allSections?.map(section => (
                <tr key={section.id}>
                  <td>{section.id}</td>
                  <td>{section.title}</td>
                  <td>{section.shortDescription}</td>
                  <td>{section.courseId}</td>
                  <td className='deletebutton' onClick={async(e)=>
                            {   await deleteSection({
                                variables: {
                                  deleteSectionId: section.id,
                                  deleteSectionCourseId:section.courseId
                                }})
                                window.location.reload(false)
                                }}>X</td>
                                <td className='editbutton'><Link to={`edit/${section.id}`} key={section.id}>Edit</Link></td>
                </tr>
                
              ))
            }
                
            </tbody>
        </table>
    </div>
  )
}

export default Sections