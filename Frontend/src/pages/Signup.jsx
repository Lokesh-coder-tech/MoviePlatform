import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/login.scss'; // Hum same premium styles reuse karenge

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/signup', formData);
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <div className="login-card glass-effect">
        <div className="login-header">
          <h2>Create Account</h2>
          <p>Join us to start managing your movies.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input type="text" name="username" required onChange={handleChange} />
            <label>Username</label>
          </div>
          <div className="input-field">
            <input type="email" name="email" required onChange={handleChange} />
            <label>Email Address</label>
          </div>
          <div className="input-field">
            <input type="password" name="password" required onChange={handleChange} />
            <label>Password</label>
          </div>

          <button type="submit" className="login-submit">Sign Up</button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <span onClick={() => navigate('/login')} style={{cursor:'pointer', color: '#e50914'}}>Sign In</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;