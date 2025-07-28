import React from 'react'
import axios from 'axios'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Movie from './components/Movie'
import MovieDetails from './components/MovieDetails'
import './App.css';



function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/movie' element={<Movie/>}/>
          <Route path='/movie/:id' element={<MovieDetails/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App