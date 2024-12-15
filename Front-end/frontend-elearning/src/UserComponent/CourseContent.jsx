import React, { useEffect, useState } from 'react'
import { UserNav } from './UserNav'
import { getChapterByCourseId } from '../UserService'
import { useParams } from 'react-router-dom'
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export const CourseContent = () => {
    const{courseId}=useParams()
    const[chapters,SetChapters]=useState([])
    const token = localStorage.getItem('token')
    console.log(token)

    useEffect(()=>{
        
        
            getChapterByCourseId(courseId,token).then((res)=>{
                SetChapters(res.data);
            
            }).catch((error)=>{
                console.log(error)
            })
        
    },[courseId])

    console.log(chapters)
  return (
   <>
      <UserNav />
            <MDBContainer>
                <h2 className="my-4 text-center">Course Chapters</h2>
                {chapters.length === 0 ? (
                    <p className='text-center'>No Chapter Found.</p>
                ) : (
                    chapters.map((chapter, index) => (
                        <MDBCard className="my-3" key={index}>
                            <MDBCardBody>
                                <MDBRow className="d-flex align-items-center">
                                    {/* Video Column */}
                                    <MDBCol md="6" className="d-flex justify-content-center">
                                        <video width="100%" height="auto" controls>
                                            <source src={`data:video/mp4;base64,${chapter.videoFileName}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </MDBCol>
                                    
                                    {/* Title Column */}
                                    <MDBCol md="6" className="d-flex flex-column align-items-center">
                                        <MDBCardTitle className="text-center">{chapter.chapterTitle}</MDBCardTitle>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    ))
                )}
            </MDBContainer>
   </>
  )
}
