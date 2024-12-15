import React, { useState } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { adminOnly, isAdmin, register } from '../UserService';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';

export const Signup = () => {
    const[userData,setUSerData]=useState(
        {
            name: '',
            email: '',
            password: '',
            role: 'USER',
        }
    )
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUSerData({ ...userData, [name]: value });
    };

    const handleRegister=async(e)=>{
        e.preventDefault();
        
        if(userData.password != confirmPassword){
            setError("Password doesn't match")
        }else{
          setError('')
        try {
          if(isAdmin()){
            setUSerData((data)=>({
              ...data,
              role:'ADMIN',
            }))
          }
            const response = await register(userData)
            console.log(response)
            if(response.statusCode===200){
                setSuccessMessage("User register successfully")
                setTimeout(() => {
                    navigate('/login');
                  }, 2000);
            }else{
                setError("Registration Failed")
            }
        } catch (error) {
          console.log(error)
          console.log(error.message)
          if(error.status === 400){
            toast.error("Email already exists")
          }else{
            toast.error("An error occured. Please try again ")
          }
        }

      }
    }
  return (
    <>
     <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <MDBCard style={{ width: '500px', padding: '20px', borderRadius: '10px', border: '1px solid #ccc' }}>
        <MDBCardBody>
          <MDBCardTitle className="text-center mb-4" style={{ fontSize: '24px', fontWeight: '500' }}>Sign up</MDBCardTitle>

          {error && <p className="text-danger text-center">{error}</p>}
          {successMessage && <p className="text-success text-center">{successMessage}</p>}

          <form onSubmit={handleRegister}>
            <MDBInput
              label="Full Name"
              type="text"
              name='name'
              value={userData.name}
              onChange={handleInputChange}
              required
              className="mb-4"
              size="lg"
            />
            <MDBInput
              label="Email"
              type="email"
              name='email'
              value={userData.email}
              onChange={handleInputChange}
              required
              className="mb-4"
              size="lg"
            />
            <MDBInput
              label="Password"
              type="password"
              name='password'
              value={userData.password}
              onChange={handleInputChange}
              required
              className="mb-4"
              size="lg"
            />
            <MDBInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
              className="mb-4"
              size="lg"
            />
            <MDBBtn type="submit" color="primary" block size="lg" className="mt-3">
              Register
            </MDBBtn>
            <p className="text-center mt-3">
                Already have an account? <a href="/login">Log in here</a>
            </p>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    <ToastContainer position="top-center" autoClose={5000} />
    </>
  )
}
