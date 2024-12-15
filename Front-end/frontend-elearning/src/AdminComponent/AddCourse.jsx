import React, { useState } from 'react'
import { addCourse } from '../UserService';
import { MDBInput, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export const AddCourse = () => {
    const [course,setCourse] = useState(
        {
            courseName:"",
            description:"",
            instructor:"",
            courseImage:null
        }
    );
    const[successMsg,setSucessMsg] = useState("");
    const[errorMsg,setErrorMsg] = useState("");

    const handleChange=(e)=>{
        const name = e.target.name;
        let value = e.target.value;

        if (name === "courseImage") {
            value = e.target.files[0]; 
        }

        setCourse({...course,[name]:value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('token')
            console.log(token)
            const success = await addCourse(course.courseName,course.description,course.instructor,course.courseImage,token);
            if(success !== undefined){
                setSucessMsg("New Course Added Sucessfully");
                setCourse({courseName:"",description:"",instructor:"",url:"",courseImage:null});
                setErrorMsg("");
            }
        }catch(err){
            setErrorMsg("Error occurred adding the course");
        }
    }

  return (
    <>
    <MDBContainer style={{ height: '100vh',width:'100%',paddingTop:'150px'}}>
      <MDBRow>
        <MDBCol size="12" md="6" className="offset-md-3">
          <form onSubmit={handleSubmit} className="add-course-form">
            <h3>Add New Course</h3>
            {successMsg && (
                <div className="alert alert-success">
                    {successMsg}
                </div>
            )}

                            
            {errorMsg && (
                <div className="alert alert-danger">
                    {errorMsg}
                </div>
            )}
            <MDBInput
              label="Course Name"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              className="mb-3"
              style={{ borderColor: '#00E0FF' }}
            />

            <MDBInput
              label="Description"
              name="description"
              value={course.description}
              onChange={handleChange}
              className="mb-3"
              style={{ borderColor: '#00E0FF' ,width:'100%'}}
              rows={4}
            />

            <MDBInput
              label="Instructor"
              name="instructor"
              value={course.instructor}
              onChange={handleChange}
              className="mb-3"
              style={{ borderColor: '#00E0FF' }}
            />

            <MDBInput
              label="Course Image"
              type="file"
              name="courseImage"
              onChange={handleChange}
              className="mb-3"
              style={{ borderColor: '#00E0FF' }}
            />

            <MDBBtn type="submit" style={{ backgroundColor: '#00E0FF' }}>
              Submit
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
  )
}
