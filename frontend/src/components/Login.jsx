import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/movie');
    }
  }, [navigate]);

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Login successful, set authentication state and go to movie app
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        navigate('/movie');
      } else {
        // Login failed, show error
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className='auth-container'>
      <h2 className='auth-title'>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input className='auth-input' placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className='auth-input' placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className='auth-button' onClick={handleLogin}>Login</button>
      <p>Dont have an account? <Link to='/signup'>Signup</Link></p>
    </div>
  );
}

export default Login;