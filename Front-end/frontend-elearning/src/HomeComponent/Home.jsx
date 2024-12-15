import React from 'react'
import "../css/Home.css";
import { Navbar } from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Footer } from './Footer';
 

export const Home = () => {

  return (
    <>
    <Navbar/>
    <div className='body'>
  <section className="hero-section" id='home'>
    <div className="content">  
    <div className="welcome-container">
    <h1 className="welcome-title" style={{color:'black'}}>Welcome to Learnify!</h1>
    <p className="welcome-subtitle">Unlock your potential and start learning today!</p>
    </div>
    </div>

    <div className="row">
          
          <div className="col-md-6 mb-4">
            <div className="p-4 bg-light rounded shadow">
              <h2 className="mb-3" style={{ color: '#00E0FF' }}>For Students</h2>
              <p>Explore new courses, boost your skills, and learn something new every day!</p>
                <li>Learn at your own pace with flexible scheduling</li>
                <li>Interactive quizzes and assignments to reinforce learning</li>
                <li>Join a community of learners and collaborate</li>
              <button className="btn mt-3" id='custom-btn-student'>Start Learning</button>
            </div>
          </div>
         
          <div className="col-md-6 mb-4">
            <div className="p-4 bg-light rounded shadow">
              <h2 className="mb-3" style={{ color: '#FA163F' }}>For Instructors</h2>
              <p className='text-truncate'>Join us as an instructor and help others unlock their potential with your expertise.</p>
              <li>Create and publish your own courses</li>
                <li>Set your own prices and earn money</li>
                <li>Access to tools and resources for course development</li>
              <button className="btn mt-3" id='custome-btn-inst'>Become an Instructor</button>
            </div>
          </div>
          </div>
  </section>
  <section className="about-section py-5" id='about'>
  <div className="container">
    <h2 className="text-center mt-5" style={{ color: '#00E0FF', fontWeight: 'bold', fontSize: '2.5rem',}}>About Learnify</h2>
    <div className="row align-items-center">
      <div className="col-md-6">
        <h3 style={{ fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Our Mission</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          At Learnify, our mission is to provide high-quality, accessible education for all. We believe in empowering individuals by helping them develop new skills and unlock their potential.
        </p>
        <h3 style={{ fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1.5rem', marginTop: '2rem' }}>What We Offer</h3>
        <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          <p>• Expert instructors from various industries</p>
          <p>• A wide variety of courses to explore</p>
          <p>• Flexible learning options for everyone</p>
        </div>
      </div>
      <div className="col-md-6 text-center">
        <img src="/src/assets/about.jpg" alt="About Learnify" className="img-fluid rounded shadow mt-3" style={{ maxWidth: '100%', height: '500px', borderRadius: '10px' }} />
      </div>
    </div>
  </div>
</section>

<section className="contact-section py-5" style={{ backgroundColor: '#f8f9fa' }} id='contact'>
  <div className="container">
    <h2 className="text-center mb-5" style={{ color: '#FA163F' }}>Contact Us</h2>
    <div className="row">
      <div className="col-md-6">
        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea id="message" className="form-control" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn mt-3" id='custom-btn-student'>Send Message</button>
        </form>
      </div>
      <div className="col-md-6">
        <h3>Get In Touch</h3>
        <p><strong>Email:</strong> support@learnify.com</p>
        <p><strong>Phone:</strong> +123 456 7890</p>
        <p><strong>Address:</strong> 123 Learnify Street, Knowledge City</p>
        <h3>Follow Us</h3>
        <div className="social-icons">
        <FontAwesomeIcon icon={faFacebookF} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faLinkedin} />
        </div>
      </div>
    </div>
  </div>
</section>

<Footer/>
</div>

    </>
  )
}
