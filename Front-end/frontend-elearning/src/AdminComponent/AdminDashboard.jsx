import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/css/admindash.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faPlus, faBook, faSignOutAlt, faUsers, faInfoCircle, faEdit, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { deleteCourseById, deleteUserById, getAllCourses, getAllUser, getdashBoardData, getEnrollDetails, logout } from '../UserService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [data, SetData] = useState({
    TotalCourse: 0,
    TotalEnroll: 0,
    TotalStudents: 0,
  });
  const [enrollCourseData, setEnrollCourseData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [activeTable, setActiveTable] = useState('courses'); 
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    getAllCourses().then((res) => {
      setCourses(res);
    }).catch(error => {
      console.log(error);
    });
  }, []);


  useEffect(() => {
    getAllUser(token).then((res) => {
      setUserData(res.userList);
    }).catch(error => {
      console.log(error);
    });
  }, []);



  useEffect(() => {
    getdashBoardData(token).then((response) => {
      if (response.status === 200 && response.headers.get('content-type')?.includes('application/json')) {
        return response.data;
      }
      throw new Error('Network response was not ok');
    })
    .then((dashData) => SetData(dashData))
    .catch((error) => console.error('Error fetching dashboard data:', error));
  }, []);

  useEffect(() => {
    getEnrollDetails(token).then((response) =>{
      const parseData = response.map((item)=>{
        const[name,students]=item.split(': ')
        return {name,students}
      })
      setEnrollCourseData(parseData)
    }
      
    ).catch(error => {
      console.log(error);
    });
  }, []);

  function handleAddNewCourse() {
    navigate("/add-new-course");
  }

  function handleAddChapter(courseId) {
    navigate(`/add-new-chapter/${courseId}`);
  }

  function handleAddAdmin(){
    navigate('/signup')
  }

  function handleCourseDelete(courseId){
    try {
      const response = deleteCourseById(courseId,token)
      toast.success('Course Deleted Successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleUserDelete(userId){
    try {
      const response = deleteUserById(userId,token);
      toast.success('You have deleted user Successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleLogout() {
    logout();
    toast.success('You have successfully logged out!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  return (
    <>
      <div className="d-flex" id="wrapper">
        <div className='side' id="sidebar-wrapper">
          <div className="sidebar-heading text-center pe-4 py-4 primary-text fs-4 fw-bold">
            <i className='px-2'><FontAwesomeIcon icon={faUserShield} /></i>Dashboard
          </div>
          <div className="list-group list-group-flush my-3">
            <a href="#" className="list-group-item  bg-transparent" onClick={handleAddNewCourse}>
              <i className='px-2'><FontAwesomeIcon icon={faPlus} />Add New Course</i></a>
            <a href="#" className="list-group-item bg-transparent">
              <i className='px-2'><FontAwesomeIcon icon={faBook} /></i>Add Chapter</a>
            <a href="#" className="list-group-item bg-transparent" onClick={handleAddAdmin}>
              <i className='px-2'><FontAwesomeIcon icon={faUserShield} /></i>Add Admin</a>
            <a href="#" className="list-group-item bg-transparent text-danger" onClick={handleLogout}>
              <i className='px-2'><FontAwesomeIcon icon={faSignOutAlt} /></i>Logout</a>
          </div>
        </div>

        <div id="page-content-wrapper">
          <nav className="navbar navbar-light bg-light" id='navbar-dashboard'>
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">Admin</span>
              <span className="username navbar-text me-4">{username}</span>
            </div>
          </nav>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="box" onClick={() => setActiveTable('students')}>
                  <h5><FontAwesomeIcon icon={faUsers} /> Number of Students</h5>
                  <p className="stat">{data.TotalStudents}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box" onClick={() => setActiveTable('courses')}>
                  <h5><FontAwesomeIcon icon={faBook} /> Number of Courses</h5>
                  <p className="stat">{data.TotalCourse}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box" onClick={() => setActiveTable('enrolls')}>
                  <h5><FontAwesomeIcon icon={faInfoCircle} /> Enroll Information</h5>
                  <p className="stat">{data.TotalEnroll}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>{activeTable==='enrolls'?'courseName':'ID'}</th>
                      <th>{activeTable === 'students' ? 'Student Name' : activeTable === 'courses'?'CourseName':'No.of.Students'}</th>
                      <th> {activeTable === 'students' ? 'Email' : activeTable === 'courses' ? 'Instructor' : ''}</th>
                      <th>{(activeTable === 'students' || activeTable === 'courses') && 'Actions'}</th>
                      {activeTable === 'courses' && <th>Add Chapter</th>}
                      {activeTable === 'students' && <th>Role</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {activeTable === 'courses' && courses.map((course) => (
                      <tr key={course.courseId}>
                        <td>{course.courseId}</td>
                        <td>{course.courseName}</td>
                        <td>{course.instructor}</td>
                        <td>
                          <a href="#" className="button-alter"><FontAwesomeIcon icon={faEdit} style={{ color: 'black' }} className='pe-4' /></a>
                          <a href="#" className="button-alter"><FontAwesomeIcon icon={faTrash} style={{ color: 'black' }} onClick={()=>handleCourseDelete(course.courseId)}/></a>
                        </td>
                        <td>
                          <a href="#" className="hover-blue" onClick={() => handleAddChapter(course.courseId)}>
                            <FontAwesomeIcon icon={faPencil} style={{ color: 'black' }} />
                          </a>
                        </td>
                      </tr>
                    ))}

                    {activeTable === 'students' && userData.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <a href="#" className="button-alter"><FontAwesomeIcon icon={faEdit} style={{ color: 'black' }} className='pe-4' /></a>
                          <a href="#" className="button-alter" onClick={()=>handleUserDelete(user.id)}><FontAwesomeIcon icon={faTrash} style={{ color: 'black' }} /></a>
                        </td>
                        <td>{user.role}</td>
                      </tr>
                    ))}

                    {activeTable === 'enrolls' && enrollCourseData.map((enroll,index) => (
                      <tr key={index}>
                        <td>{enroll.name}</td>
                        <td>{enroll.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};
