import React from 'react'
import { useState } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate ,Link} from 'react-router-dom';
import { login } from '../UserService';

export const Login = () => {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState('');
    const navigate = useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            const userData = await login(email,password);
            if(userData.token){
                localStorage.setItem('token',userData.token);
                localStorage.setItem('role',userData.role);
                localStorage.setItem('id',userData.id)
                localStorage.setItem('username',userData.user.name)
                console.log(userData.user.name)
                console.log(userData.id);
                if (userData.role === 'ADMIN') {
                  navigate('/admin-dashboard');
                } else{
                  navigate('/');
                }
            }else{
                setError("Invalid UserName or Password")
            }
        } catch (error) { 
            console.log(error)
            setError(error.message)
            setTimeout(()=>{
                setError('');
            },5000)
        }
    }
  return (
    <>
  <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <MDBCard style={{ width: '500px', minHeight: '400px', border: '1px solid #ccc', padding: '20px' }}>
        <MDBCardBody>
          <MDBCardTitle className="text-center mb-4" style={{ fontSize: '24px' ,fontWeight:'500'}}>Login</MDBCardTitle>
          {error && <p className="alert alert-danger" role="alert">{error}</p>}
          <form onSubmit={handleLogin}>
            <MDBInput
              label="Email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="mb-4"
              size="lg"
            />
            <MDBInput
              label="Password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="mb-4"
              size="lg"
            />
            <MDBBtn type="submit" color="info" block size="lg" className='mt-3'>
              Login
            </MDBBtn>
            <div className="text-center mt-4">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>
  )
}
