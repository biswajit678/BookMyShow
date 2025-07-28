import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Movie.css'

function Movie() {
    const navigate = useNavigate()
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [navigate])
    
    const movie = [
        { id: 0, title: 'Avatar', poster: 'https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_SY679_.jpg', release: '2009-12-18' },
        { id: 1, title: 'Interstellar', poster: 'https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg', release: '2014-11-07' },
        { id: 2, title: 'Inception', poster: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg', release: '2010-02-19' },
        { id: 3, title: 'Avengers Endgame', poster: 'https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg', release: '2019-04-26' }
    ]

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`)
    }

    return (
        <div className="movie-container">
            <h2 className="movie-title">Movies</h2>
            <div className="movie-grid">
                {movie.map((m, idx) => (
                    <div 
                        className="movie-card" 
                        key={idx}
                        onClick={() => handleMovieClick(m.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={m.poster} alt={m.title} className="movie-poster" />
                        <div className="movie-name">{m.title}</div>
                        <div className="movie-release">Release: {m.release}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Movie 