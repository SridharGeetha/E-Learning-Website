import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const login =async(email,password)=>{
try {
    const response = await axios.post(BASE_URL+"/auth/login",{email,password});
    return response.data;
} catch (error) {
    throw error
}
}


const register =async(userData)=>{
try {
    const response = await axios.post(BASE_URL+"/auth/register",userData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
    return response.data;
} catch (error) {
    throw error
}
}
const refershToken =async(userData)=>{
try {
    const response = await axios.post(BASE_URL+"/auth/refersh",userData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
    return response.data;
} catch (error) {
    throw error
}
}


const getAllUser =async(token)=>{

try {
    const response = await axios.get(BASE_URL+"/admin/get-all-users",{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
} catch (error) {
    throw error
    }
}

const getUserById =async(id,token)=>{

    try {
        const response = await axios.get(`${BASE_URL}/admin/get-user/${id}`,{
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        throw error
    }
}

const updateUser =async(id,userData,token)=>{

    try {
        const response = await axios.put(`${BASE_URL}/adminuser/update-user/${id}`,userData,{
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        throw error
    }
}

const deleteUser =async(id,token)=>{

    try {
        const response = await axios.delete(`${BASE_URL}/admin/delete-user${id}`,{
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        throw error
    }
}
// course function 
const getAllCourses =async()=>{

    try {
        const response = await axios.get(BASE_URL+"/auth/getCourse");
        return response.data;
    } catch (error) {
        throw error
        }
    }

export const addCourse = async (courseName,description,instructor,courseImage,token)=>{

    const formData = new FormData()
    formData.append("courseName",courseName)
    formData.append("description",description)
    formData.append("instructor",instructor)
    formData.append("courseImage",courseImage)
    const response = await axios.post(BASE_URL+"/admin/add-new-course",formData,{
        headers: {Authorization: `Bearer ${token}`}
    });
    if(response.status === 201){
        return true;
    }
    else{
        return false;
    }
}

export const getCourseById=async(courseId)=>{

    try{
    
        const result = await axios.get(BASE_URL+"/public/"+courseId);
    
        return result;
            
    }catch(err){
        throw new Error("error in get the  course by Id")
    }
    
}



export const enrollCourse=async(userId,courseId,token)=>{
        try{
            const result = await axios.post(`${BASE_URL}/user/${userId}/enroll/${courseId}`,{},{
                headers: {Authorization: `Bearer ${token}`}
            })
            return result;
        }catch(err){
            throw new Error("error in Enrollement")
        }
    }

    export const getUserDetailByUserId=async(userId,token)=>{

        try{
        
            const result = await axios.get(BASE_URL+"/adminuser/get-user/"+userId,{
                headers: {Authorization: `Bearer ${token}`}
            });
        
            return result;
                
        }catch(err){
            throw new Error("error in get the Enroll course")
        }
        
    }
    export const deleteCourseById=async(courseId,token)=>{

        try{
        
            const result = await axios.delete(BASE_URL+"/admin/delete-course/"+courseId,{
                headers: {Authorization: `Bearer ${token}`}
            });
        
            return result;
                
        }catch(err){
            throw new Error("error in get the Enroll course")
        }
        
    }
    
// chapter function

export const getChapterTitle=async(courseId)=>{
    try{
        const result = await axios.get(BASE_URL+"/public/"+courseId+"/chapterTitle")
        return result;
    }catch(err){
        throw new Error("error in get the chapterTitle course")
    }
}

export const uploadChapter=async(courseId,formData,token)=>{
    try{
        const result = await axios.post(BASE_URL+"/admin/chapter-upload/"+courseId,formData,{
            headers: {Authorization: `Bearer ${token}`}
        })
        return result;
    }catch(err){
        throw new Error("error in get the chapterTitle course")
    }
} 

export const getChapterByCourseId=async(courseId,token)=>{
    try{
        const result = await axios.get(BASE_URL+"/adminuser/"+courseId+"/chapter",{
            headers: {Authorization: `Bearer ${token}`}
        })
        return result;
    }catch(err){
        throw new Error("error in get the chapterTitle course")
    }
}

// user And course Data for Admin And Admin Activity

export const getdashBoardData=async(token)=>{
    try{
        const result = await axios.get(BASE_URL+"/admin/get-dashboard-data",{
            headers: {Authorization: `Bearer ${token}`
            
        }
        })
        return result;
    }catch(err){
        throw new Error("error in get the chapterTitle course")
    }
}

export const getEnrollDetails=async(token)=>{
    try{
        const result = await axios.get(BASE_URL+"/admin/get-enroll-data",{
            headers: {Authorization: `Bearer ${token}` 
        }
        })
        return result.data;
    }catch(err){
        throw new Error("error in get the enroll data  course")
    }
}



export const getuserDetails=async(token)=>{
    try{
        const result = await axios.get(BASE_URL+"/admin/get-enroll-data",{
            headers: {Authorization: `Bearer ${token}` 
        }
        })
        return result;
    }catch(err){
        throw new Error("error in get the enroll data  course")
    }
}


export const deleteUserById=async(userId,token)=>{
    try{
        const result = await axios.delete(BASE_URL+"/admin/delete-user/"+userId,{
            headers: {Authorization: `Bearer ${token}` 
        }
        })
        return result;
    }catch(err){
        throw new Error("error in get the enroll data  course")
    }
}


// Auth function 
const logout=()=>{
    localStorage.removeItem('token');
     localStorage.removeItem('role');
     localStorage.removeItem('id');
     localStorage.removeItem('username');
}

function isAuthenticated(){
    const token = localStorage.getItem('token')
    return !!token
}

function isAdmin(){
    const role = localStorage.getItem('role')
    return role == 'ADMIN'
}

function isUser(){
    const role = localStorage.getItem('role')
    return role ==='USER'
}

function adminOnly(){
    return this.isAuthenticated() && this.isAdmin();
}

export {
    register,
    refershToken,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllCourses,
    logout,
    isAuthenticated,
    isAdmin,
    isUser,
    adminOnly
  };