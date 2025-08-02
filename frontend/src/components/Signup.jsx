import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/movie');
    }
  }, [navigate]);

  const handleSignup = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://bookmyshow-9i97.onrender.com';
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Signup</h2>
      <input className="auth-input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="auth-input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="auth-button" onClick={handleSignup}>Signup</button>
      <p>Already have an account? <Link to='/'>Login</Link></p>
    </div>
  );
}

export default Signup;