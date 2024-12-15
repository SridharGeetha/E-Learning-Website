import React, { useEffect, useState } from 'react'
import '/src/css/usercourses.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../UserService';
import { Navbar } from '../HomeComponent/Navbar';

export const UserCourses = () => {
const[courses,setCourses]=useState([]);
const[isLoading,setIsLoading]=useState(false);
const[filterCourse,setFilterCourse]=useState([]);

const navigate = useNavigate();


useEffect(() => {

  setIsLoading(true);
  getAllCourses()
    .then((res) => {
      setCourses(res);          
      setFilterCourse(courses);      
      setIsLoading(false);       
    })
    .catch((error) => {
      console.log(error);      
      setIsLoading(false);       
    });
}, []);

console.log(courses)


    useEffect(()=>{
        if(filterCourse.length === 0){
            setFilterCourse(courses);
        }
        else{
            const filtered = courses.filter((course)=>course.courseName === filterCourse)
            setFilterCourse(filtered);
        }
        
    },[courses])

    function handleViewCourse(courseId){
    navigate(`/view-course/${courseId}`);
    }

    if(isLoading){
      return <div className='text-center mt-5'>Loading Courses</div>
    }
  return (
    <>
    <Navbar/>
    <div className="container py-5" id='con'>
  <h3 className='text-center mt-5' style={{color:'black'}}>Courses</h3>
  <div className='row row-cols-md-1 row-cols-md-3 g-4 py-5'>
  {filterCourse.map((course, index) => (
    <div className="col" key={course.courseId}>
    <div className="card"id='card'>
  <img src={course.courseImage ? `data:image/jpeg;base64,${course.courseImage}` : '/src/assets/dummy.jpg'}className="card-img-top" alt=''/>
  <div className="card-body">
    <h5 className="card-title" id='ct'>{course.courseName}</h5>
    <h6 className=" mb-2 text-body-secondary"><span id='sp-ins'>Instructor:</span> {course.instructor}</h6>
   
    <p className="card-text text-truncate" id='des'>{course.description}</p>
  </div>
  <div className='d-flex justify-content-around mb-3'>
    <h5>FREE</h5>
    <a id='course-view-link'
     onClick={()=>{handleViewCourse(course.courseId)}} 
    className='card-link'>View Course  <FontAwesomeIcon icon={faArrowRight}/> </a>
  </div>
    </div>
  </div>
  ))
}
</div>
</div>
    </>
  )
}
