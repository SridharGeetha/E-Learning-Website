import React, { useEffect, useState } from 'react'
import { UserNav } from './UserNav'
import { EnrolledCourse } from './EnrolledCourse'
import {  getUserDetailByUserId } from '../UserService'
import '/src/css/userdash.css'

export const UserDashboard = () => {
const[userInfo,setUserInfo]=useState(null)
const[enrollcourse,setEnrollCourse]=useState([])

useEffect(()=>{
const userId = localStorage.getItem('id')
const token = localStorage.getItem('token')
if(userId!=null&&token!=null){
  getUserDetailByUserId(userId,token).then((res)=>{
    const userData = res.data.user
    setUserInfo(userData);
    setEnrollCourse(res.data.user.courses)
  }).catch((error)=>{
    console.log("error fetch the user Data",error)
  })
}else{
  console.log("user not login")
}
},[])

  return (
    <>
   {userInfo &&  <UserNav/> }
    <EnrolledCourse courses={enrollcourse} userData={userInfo}/>
    </>
  )
}
