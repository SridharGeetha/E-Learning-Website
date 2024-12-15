import { BrowserRouter,Routes, Route  } from 'react-router-dom'
import './App.css'
import { Login } from './AuthComponent/Login'
import { UserDashboard } from './UserComponent/UserDashboard'
import { Signup } from './AuthComponent/Signup'
import { Home } from './HomeComponent/Home'
import { AdminDashboard } from './AdminComponent/AdminDashboard'
import { UserCourses } from './CourseComponent/UserCourses'
import { AddCourse } from './AdminComponent/AddCourse'
import { AddChapter } from './AdminComponent/AddChapter'
import { ViewCourse } from './CourseComponent/ViewCourse'
import { adminOnly, isAuthenticated } from './UserService'
import { CourseContent } from './UserComponent/CourseContent'


function App() {

  function isUsers(){
    const role = !!localStorage.getItem('token')
    return role
}
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/users-course'element={<UserCourses/>}></Route>
      <Route path='/view-course/:courseId' element={<ViewCourse/>}></Route>
      {adminOnly && 
        <Route 
        path="/admin-dashboard" 
        element={<AdminDashboard />} 
        />
       }
        {isUsers() &&(
          <>
        <Route path="/user-dashboard" element={<UserDashboard /> } />
        <Route path='/course-content/:courseId' element={<CourseContent/>}></Route>
          </>
        )
        }
      <Route path='/add-new-course' element={<AddCourse/>}></Route> 
      <Route path='/add-new-chapter/:courseId' element={<AddChapter/>}></Route> 
     </Routes>
     
     </BrowserRouter>
    </>
 
  )
}

export default App
