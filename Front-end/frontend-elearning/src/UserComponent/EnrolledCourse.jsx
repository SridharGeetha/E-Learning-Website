import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const EnrolledCourse = ({courses}) => {
  const[isLoading,setIsLoading]=useState(true);

  const navigate = useNavigate()

  useEffect(()=>{
    if(courses.length>0){
      setIsLoading(false)
    }
  },[courses])

if(isLoading){
  return <div className='text-center mt-5 pt-5'> Loading Courses...</div>
}

  function handleAccessCourse(courseId){
    navigate(`/course-content/${courseId}`)
  }

  return (
   <>
    <div>
      <h3 id='user-welcome'>Start learning today!</h3>
      {courses.length > 0 ? (
        <div className="row " id='user-container'>
          {courses.map((course, index) => (
            <div className="col-md-12  " key={index} id='user-col'>
              <div className="card h-100" id='user-card'>
                <div className="card-body d-flex align-items-center justify-content-around" id='user-card-body'>
                <div className='user-course-img'>
                 <img
                   src={course.courseImage ? `data:image/jpeg;base64,${course.courseImage}` : '/src/assets/dummy.jpg'}
                   className="card-img-top"
                   alt={course.courseName}
                   style={{ height: '200px',width:'200px',objectFit: 'cover' }}
                   />
                </div>
                  <h5 className="card-title">{course.courseName}</h5>
                  <p className="card-text">
                    <strong>Instructor:</strong> {course.instructor}
                  </p>
                  <div>
                  <MDBBtn style={{backgroundColor:'#00E0FF',fontFamily:'sans-serif'}}  onClick={()=>handleAccessCourse(course.courseId)}>
                    Start the Course
                  </MDBBtn>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Welcome </h3>
          <p>
            It looks like you haven't enrolled in any courses yet. Explore our courses and start learning today!
          </p>
        </div>
      )}
    </div>
   </>
  )
}
