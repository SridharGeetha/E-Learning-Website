import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { isAdmin, isUser } from '../UserService';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const[isAuthenticated,setAuthenticated]=useState(false);

    useEffect(()=>{
      const userToken = localStorage.getItem('token')
      if(userToken){
        setAuthenticated(true)
      }
    },[])

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
      };
    const handleHome=()=>{
        navigate('/')
    }
    const handleAllCourse=()=>{
        navigate('/users-course');
    }
      const handleLogIn=()=>{
        navigate("/login");
      }  
      const handleSignIn=()=>{
        navigate("/signup");
      }

      const handleAccount=()=>{
        if(isUser()){
          navigate('/user-dashboard')
        }else if(isAdmin()){
          navigate('/admin-dashboard')
        }
      }
    const handleLogout=()=>{
    localStorage.removeItem('token');
     localStorage.removeItem('role');
     localStorage.removeItem('id');
     localStorage.removeItem('username');
     const token = localStorage.getItem('token')
    //  console.log(token)
     setAuthenticated(false)
     toast.success('You have successfully logged out!', {
      position: 'top-center',  
      autoClose: 3000,                   
      hideProgressBar: true,             
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
     
     if(!token){
      navigate('/')
     }
    }  


  return (
    <>
<div className='body'>
  <header>
    <nav className="navbar">  
       <h1 className='website-name'>Onclick</h1>
      <ul className={`menu-links ${menuOpen ? 'open':''}`}>
        <li><a href='#home' onClick={handleHome}>Home</a></li>
        <li><a  onClick={handleAllCourse}>Courses</a></li>
        <li><a href='#about'>About</a></li>
        <li><a href='#contact'>Contact</a></li>
        {
          !isAuthenticated?(
            <>
            <li className="join-btn"><a  onClick={handleLogIn}>Log In</a></li>
            <li className='join-btn'><a  onClick={handleSignIn}>Sign In</a></li>   
            </>
          ):(
            <>
          <li className='d-flex align-items-center'> 
          <a onClick={handleAccount}>
            My account
            </a>
           <div className="dropstart" id='drop-box'>
             <a href="#" className="dropdown-toggle pl-2" data-bs-toggle="dropdown"></a>
             <ul className="dropdown-menu mt-4">
               <li><a className="dropdown-item" href="#">My Course</a></li>
               <li><a className="dropdown-item" href="#">Profile</a></li>
               <li><a className="dropdown-item" href="#" style={{color:'red'}} onClick={handleLogout}>Log out</a></li>
             </ul>
           </div>
          </li>
            </> 
          )
        }
      </ul>
      <div className='menu-icon'>
        <i onClick={handleToggleMenu} ><FontAwesomeIcon icon={faBars} size="2x" color="white" /></i>
      </div>
    </nav>
  </header>
  </div>
  <ToastContainer position="top-center" autoClose={5000} />
    </>
  )
}
