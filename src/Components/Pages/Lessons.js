import React, { useEffect, useState } from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';

const GET_LESSONS = gql`
  query{
    allLessons {
      id
      title
      video
      quizURL
      courseId
      sectionId
    }
  }
`;

const DELETE_LESSON = gql`

mutation($deleteLessonId: String!, $deleteLessonSectionId: String!, $deleteLessonCourseId: String!) {
  deleteLesson(id: $deleteLessonId, sectionId: $deleteLessonSectionId, courseId: $deleteLessonCourseId)
}

`;

function Lessons() {
  const { loading, error, data ,refetch} = useQuery(GET_LESSONS);
  const [deleteLesson, { dataa, loadingg, errorr }] = useMutation(DELETE_LESSON);

  if (loading || loadingg) return <p>Loading...</p>;
  if (error ) return <p>{error.message}</p>;
  return (
    <div className='lessons_page'>
        <button type="button" class="btn btn-light mt-4"><Link to="/lessons/create">Add new Lesson</Link></button>
        <figure class="text-center">
        
            <blockquote class="blockquote">
                <p><b>Lesson List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Add Update Delete Lessons</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Video</th>
                    <th>Section ID</th>
                    <th>Course ID</th>
                    <th>Quiz URL</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
                
            {
              data?.allLessons?.map(lesson => (
                <tr key={lesson.id}>
                  <td>{lesson.id}</td>
                  <td>{lesson.title}</td>
                  <td>{lesson.video}</td>
                  <td>{lesson.sectionId}</td>
                  <td>{lesson.courseId}</td>
                  <td>{lesson.quizURL}</td>
                  <td className='deletebutton' onClick={async(e)=>
                            {  await deleteLesson({
                                variables: {
                                  deleteLessonId: lesson.id,
                                  deleteLessonSectionId:lesson.sectionId,
                                  deleteLessonCourseId:lesson.courseId
                                }})
                                window.location.reload(false)
                                }}>X</td>
                                <td className='editbutton'><Link to={`edit/${lesson.id}`} key={lesson.id}>Edit</Link></td>
                </tr>
                
              ))
            }
                
            </tbody>
        </table>
    </div>
  )
}

export default Lessons