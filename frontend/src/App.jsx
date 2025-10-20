import React from 'react'
import {Routes, Route,Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import ProfilePage from './components/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import MovieDetails from './pages/MovieDetails'
import SelectTheater from './pages/SelectTheater'
import SeatBooking from './pages/SeatBooking'
import WatchWithMe from './pages/WatchWithMe'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser);
  
  if(isCheckingAuth && !authUser){
    return <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  }

  return (
    <div>
      <Navbar/>
      <div className='pt-16'>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to='/login'/>}/>
        <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to='/'/>}/>
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to='/'/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to='/login'/>}/>
        <Route path='/movie/:id' element={authUser ? <MovieDetails/> :<Navigate to='/login'/>}/>
        <Route path='/theater/:movieId' element={authUser ? <SelectTheater/> : <Navigate to='/login'/>}/>
        <Route path='/seats/:theaterId' element={authUser ? <SeatBooking/> : <Navigate to='/login'/>}/>
        <Route path='/buddy' element={authUser ? <WatchWithMe/> : <Navigate to='/login'/>}/>

      </Routes>
      </div>
      <Toaster/>
    </div>
  )
}

export default App