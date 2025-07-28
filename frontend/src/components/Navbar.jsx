import React from 'react'
import {useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation();
    
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('username');
            navigate('/')
        }
    }

    const handleBack = () => {
        navigate('/movie')
    }

    // Don't show navbar on login and signup pages
    if (location.pathname === '/' || location.pathname === '/signup') {
        return null;
    }

    return (
        <nav className="navbar">
            {location.pathname.startsWith('/movie/') && (
                <button className="nav-back" onClick={handleBack}>
                    ← Back to Movies
                </button>
            )}
            <button className="nav-logout" onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navbar