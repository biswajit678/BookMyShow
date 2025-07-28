import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MovieDetails.css'

function MovieDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [selectedTime, setSelectedTime] = useState('')
    const [selectedSeats, setSelectedSeats] = useState([])
    const [bookingStep, setBookingStep] = useState('select') // select, seats, confirm

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [navigate])

    // Enhanced movie data with detailed information
    const movies = [
        {
            id: 0,
            title: 'Avatar',
            poster: 'https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_SY679_.jpg',
            release: '2009-12-18',
            runtime: '2h 42m',
            rating: 'PG-13',
            genre: 'Sci-Fi, Adventure, Fantasy',
            director: 'James Cameron',
            cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Stephen Lang'],
            description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
            plot: 'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following his orders and protecting the world he feels is his home.',
            showTimes: ['10:00 AM', '1:30 PM', '4:00 PM', '7:30 PM', '10:00 PM'],
            price: 12.99
        },
        {
            id: 1,
            title: 'Interstellar',
            poster: 'https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg',
            release: '2014-11-07',
            runtime: '2h 49m',
            rating: 'PG-13',
            genre: 'Sci-Fi, Adventure, Drama',
            director: 'Christopher Nolan',
            cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Mackenzie Foy'],
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            plot: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
            showTimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
            price: 14.99
        },
        {
            id: 2,
            title: 'Inception',
            poster: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg',
            release: '2010-02-19',
            runtime: '2h 28m',
            rating: 'PG-13',
            genre: 'Sci-Fi, Action, Thriller',
            director: 'Christopher Nolan',
            cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
            showTimes: ['12:00 PM', '3:30 PM', '7:00 PM', '10:30 PM'],
            price: 13.99
        },
        {
            id: 3,
            title: 'Avengers Endgame',
            poster: 'https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg',
            release: '2019-04-26',
            runtime: '3h 1m',
            rating: 'PG-13',
            genre: 'Action, Adventure, Drama',
            director: 'Anthony Russo, Joe Russo',
            cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'],
            description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
            plot: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
            showTimes: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM'],
            price: 15.99
        }
    ]

    const movie = movies.find(m => m.id === parseInt(id))

    if (!movie) {
        return <div className="movie-details-error">Movie not found</div>
    }

    const handleTimeSelect = (time) => {
        setSelectedTime(time)
        setBookingStep('seats')
    }

    const handleSeatSelect = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat))
        } else {
            setSelectedSeats([...selectedSeats, seat])
        }
    }

    const handleBooking = () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat')
            return
        }
        setBookingStep('confirm')
    }

    const confirmBooking = () => {
        alert(`Booking confirmed! You have booked ${selectedSeats.length} seat(s) for ${movie.title} at ${selectedTime}. Total: $${(selectedSeats.length * movie.price).toFixed(2)}`)
        setBookingStep('select')
        setSelectedTime('')
        setSelectedSeats([])
    }

    const renderBookingSection = () => {
        switch (bookingStep) {
            case 'select':
                return (
                    <div className="booking-section">
                        <h3>Select Show Time</h3>
                        <div className="time-slots">
                            {movie.showTimes.map((time, index) => (
                                <button 
                                    key={index} 
                                    className="time-slot"
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            case 'seats':
                return (
                    <div className="booking-section">
                        <h3>Select Seats</h3>
                        <p>Selected Time: {selectedTime}</p>
                        <div className="seat-selection">
                            <div className="screen">SCREEN</div>
                            <div className="seats-grid">
                                {Array.from({ length: 48 }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`seat ${selectedSeats.includes(i + 1) ? 'selected' : ''}`}
                                        onClick={() => handleSeatSelect(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="seat-legend">
                                <span className="legend-item">
                                    <div className="seat-available"></div> Available
                                </span>
                                <span className="legend-item">
                                    <div className="seat-selected"></div> Selected
                                </span>
                            </div>
                            <button className="book-button" onClick={handleBooking}>
                                Continue to Payment
                            </button>
                        </div>
                    </div>
                )
            case 'confirm':
                return (
                    <div className="booking-section">
                        <h3>Confirm Booking</h3>
                        <div className="booking-summary">
                            <p><strong>Movie:</strong> {movie.title}</p>
                            <p><strong>Time:</strong> {selectedTime}</p>
                            <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
                            <p><strong>Total:</strong> ${(selectedSeats.length * movie.price).toFixed(2)}</p>
                        </div>
                        <div className="booking-actions">
                            <button className="confirm-button" onClick={confirmBooking}>
                                Confirm Booking
                            </button>
                            <button className="cancel-button" onClick={() => setBookingStep('select')}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-content">
                <div className="movie-poster-section">
                    <img src={movie.poster} alt={movie.title} className="movie-details-poster" />
                </div>
                
                <div className="movie-info-section">
                    <h1 className="movie-details-title">{movie.title}</h1>
                    
                    <div className="movie-meta">
                        <span className="meta-item">{movie.rating}</span>
                        <span className="meta-item">{movie.runtime}</span>
                        <span className="meta-item">{movie.genre}</span>
                        <span className="meta-item">{movie.release}</span>
                    </div>

                    <div className="movie-description">
                        <h3>Synopsis</h3>
                        <p>{movie.description}</p>
                    </div>

                    <div className="movie-cast">
                        <h3>Cast</h3>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                    </div>

                    <div className="movie-plot">
                        <h3>Plot</h3>
                        <p>{movie.plot}</p>
                    </div>
                </div>
            </div>

            <div className="booking-container">
                {renderBookingSection()}
            </div>
        </div>
    )
}

export default MovieDetails
