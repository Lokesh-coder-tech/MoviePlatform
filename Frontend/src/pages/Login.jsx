import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Redirect ke liye
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/pages/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook initialize karo

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      
      // 1. Context aur LocalStorage update karo
      login(res.data, res.data.token); 
      
      // 2. Sweet Alert ya Simple Alert (Optional)
      console.log("Login Success!");

      // 3. Redirect to Home Page
      navigate('/'); 
      
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed. Check your credentials.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <div className="login-card glass-effect">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              autoComplete="off"
            />
            <label>Email Address</label>
          </div>

          <div className="input-field">
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <label>Password</label>
          </div>

          <button type="submit" className="login-submit">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <span onClick={() => navigate('/signup')} style={{cursor:'pointer', color: '#e50914'}}>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;