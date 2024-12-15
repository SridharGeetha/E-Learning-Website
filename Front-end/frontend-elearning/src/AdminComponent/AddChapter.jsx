import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { uploadChapter } from '../UserService';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBFile,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from 'mdb-react-ui-kit';

export const AddChapter = () => {
  const{courseId}=useParams();
  const [chapterTitle, setChapterTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

const handleFileChange=(e)=>{
  setVideoFile(e.target.files[0]);
}

const handleUpload=async(e)=>{
e.preventDefault();
const token = localStorage.getItem('token')
console.log(localStorage.getItem('role'))
console.log(token)
console.log(localStorage.getItem('username'))
const form = new FormData()
form.append('title',chapterTitle)
form.append('video',videoFile)
try {
  const response = await uploadChapter(courseId,form,token)
  console.log(response.data.chapterTitle)
  if(response.courseId>0){
    setMessage("Chapter uploaded successfully!")
    setChapterTitle('');
    setVideoFile(null);
  }else{
    setError("Chapter uploaded successfully!")
  }
} catch (error) {
  setError("Failed to upload the chapter")
}
}

  return (
    <>
     <MDBContainer className="my-5">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle className="text-center">Upload Chapter</MDBCardTitle>
          {message && <p className="text-success text-center">{successMessage}</p>}
          {error && <p className="text-success text-center">{error}</p>}
          <form onSubmit={handleUpload}>
            <MDBInput
              label="Chapter Title"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              required
            />
            <MDBFile
              label="Upload Chapter Video"
              onChange={handleFileChange}
              accept="video/*"
              required
            />
            <MDBBtn type="submit" color="primary" className="mt-3">
              Upload Chapter
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>
  )
}
