import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '/src/css/viewcourse.css'
import { enrollCourse, getChapterTitle, getCourseById, isAdmin } from '../UserService';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Navbar } from '../HomeComponent/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ViewCourse = () => {
  const {courseId} = useParams();
  const[course,SetCourse]=useState([]);
  const [chapterTitle,setChapterTitle] = useState([]);
  const[isAuthenticated,setAuthenticated]=useState(false);
  const[isEnroll,SetIsEnroll]=useState()

  const navigate=useNavigate();

  useEffect(()=>{
    const userToken = localStorage.getItem('token')
    if(userToken){
      setAuthenticated(true)
    }
  },[])

  useEffect(()=>{
    getCourseById(courseId).then((res)=>{
      SetCourse(res.data[0])
      console.log('API Response:', res);
    

    }).catch(error =>{
      console.log(error);
      console.log('Error fetching course:', error); 
  })
  },[courseId]);

  useEffect(()=>{
    getChapterTitle(courseId).then((res)=>{
      setChapterTitle(res.data);
      console.log('API Response:', res.data);
    }).catch(error =>{
      console.log(error);
      console.log('Error fetching course:', error); 
  })
  },[courseId])

  const handleEnroll=async()=>{
    
      const token = localStorage.getItem('token')
      // const role = localStorage.getItem('role')
      console.log(token)
      const id = localStorage.getItem('id')
      if (id && token) {
        try {
          const response = await enrollCourse(id, courseId, token);
          console.log('Enrollment successful:', response.data);
          toast.success('You have successfully enrolled in the course!');
          SetIsEnroll(true)
        } catch (error) {
          if(isAdmin){
            toast.error('Admin No access to enroll');
          }else{
            console.error('Error during enrollment:', error);
            toast.error('Please login to enroll!');
          }
        }
      } else {
      
        toast.error('Please login to enroll!');
        navigate('/login');
      }
    
  }
 
  return (
    <>
    <Navbar/>
    {course &&( 
 <div className="row justify-content-md-center " style={{marginTop:'80px'}} id='container'>
     <div className="col col-lg-6">
     <div className="card" >
   <img src={course.courseImage ? `data:image/jpeg;base64,${course.courseImage}` : '/src/assets/dummy.jpg'} className="card-img-top" />
   <div className="card-body" id='c-body'>
     <h5 className="card-title">{course.courseName}</h5>
     <p className="card-text">{course.description}</p>
     <h6><strong>Instructor :</strong> {course.instructor}</h6>
   </div>
   <ul className="list-group list-group-flush" id='list-item'>
     <li className="list-group-item"><h5>Content Overview</h5></li>
     {chapterTitle.map((title, index) => (
                   <li className="list-group-item items" key={index}>
                     {title}
                   </li>
                 ))}
   
   </ul>
   <div className="card-body  text-center">
     <MDBBtn href="#" className="enroll-btn" id='custom-btn-enroll' color='info' outline onClick={handleEnroll}>{isEnroll ? 'Start':'Enroll'}</MDBBtn>
   </div>
 </div>
 </div> 
 </div> )} 
 <ToastContainer position="top-right" autoClose={3000} />
 </>
  )
}
