import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '/src/css/usernav.css'

import { logout } from '../UserService';

export const UserNav = () => {
  const [name, setName] = useState('');
  const navi=useNavigate()

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    console.log(storedName)
    if (storedName) {
      setName(storedName);
    }else{
      setName('user')
    }
  }, []);
  const handleLogout=()=>{
    logout()
    toast.success('You have successfully logged out!', {
      position: 'top-center',  
      autoClose: 3000,                   
      hideProgressBar: true,             
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(()=>{
      navi('/')
    },3000)
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg " id='nav'>
      <div className='nav-title'>
      <h3>User Dashboard</h3>
      </div>
      <div className='nav-list' id='nav-li'>
            <li className="nav-item">
                <Link to="/" className='nav-text'>Home</Link>
            </li>
            <li className="nav-item">
               <Link to="/users-course" className='nav-text'>Course</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-text'>{name} <FontAwesomeIcon icon={faUser} size="1x" /></Link> 
            </li>
            <li className="nav-item">
              <a onClick={handleLogout} className='lgt nav-text'>log out</a> 
            </li>
      </div>
    </nav>
    <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}
