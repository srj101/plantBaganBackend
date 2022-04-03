import React, { useEffect } from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';
const GET_COURSES = gql`
query getCourses{
  getCourses {
    id
    title
    instructorName
    instructorId
    rating
    lessonCount
    duration
    level
    offer
    sectionCount
    quizCount
    description
    enrolledStudents
    image
    price
    overview
  }
}
`;

const COURSE_DELETE = gql`
  mutation DeleteCourse ($deleteCourseId: String!){
  deleteCourse(id: $deleteCourseId)
}

`;

function Courses() {
    const { loading, error, data ,refetch} = useQuery(GET_COURSES);
    const [deleteCourse, deletedCourse] = useMutation(COURSE_DELETE);

    if (loading || deletedCourse.loading) return <p>Loading...</p>;
    if (error || deletedCourse.error) return <p>Error :(</p>;
    
  return (
    <div className='courses_page'>
        <button type="button" class="btn btn-light mt-4"><Link to="/courses/create">Add new Course</Link></button>
        <figure class="text-center">
            <blockquote class="blockquote">
                <p><b>Course List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Add Update Delete Courses</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Course Title</th>
                    <th>Instructor</th>
                    <th>Duration</th>
                    <th>Level</th>
                    <th>Lessons</th>
                    <th>Sections</th>
                    <th>Rating</th>
                    <th>Quizes</th>
                    <th>enrolled Students</th>
                    <th>Price</th>
                    <th>On Offer</th>
                    <th>DELETE</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    data?.getCourses?.map(course => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.title}</td>
                            <td>{course.instructorName}</td>
                            <td>{course.duration}</td>
                            <td>{course.level}</td>
                            <td>{course.lessonCount}</td>
                            <td>{course.sectionCount}</td>
                            <td>{Array(course.rating)
                        .fill(1)
                        .map((el, i) => (
                            <span>⭐</span>
                        ))}
                    </td>
                            <td>{course.quizCount}</td>
                            <td>{course.enrolledStudents}</td>
                            <td>${course.price}</td>
                            <th>{course.offer?"Yes":"NO"}</th>
                            <td className='deletebutton' onClick={async(e)=>
                            {  await deleteCourse({
                                variables: {
                                    deleteCourseId: course.id
                                }})
                                window.location.reload(false)
                                }}>X</td>
                                <td className='editbutton'><Link to={`edit/${course.id}`} key={course.id}>Edit</Link></td>
                        </tr>
                        
                    ))
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default Courses