import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Link} from 'react-router-dom'
import {LogOut,Tickets, User} from 'lucide-react'

const Navbar = () => {
  const {logout, authUser}= useAuthStore()
  return (
   <header className='bg-gray-100 fixed w-full top-0 z-40 shadow-md h-16'>
    <div className='container mx-auto px-4'>
      <div className='flex items-center justify-between'>  
        <div className='flex items-center gap-8'>
          <Link to='/' className='flex items-center gap-2.5 animate-bounce mt-4'>
          <h1 className='text-lg text-red-600 font-bold '>🎟️Movies</h1>
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          {authUser && (
            <>
            <Link to={'/profile'} className='btn btn-sm gap-2 hover:animate-pulse mt-4' >
            <User className='size-5'/>
            <span className='hidden sm:inline'>Profile</span>
            </Link>
            <button onClick={logout} className='btn btn-sm gap-2 hover:animate-pulse mt-4'>
              <LogOut className='w-4 h-4'/>
              <span>Logout</span>
            </button>
            </>
          )}
        </div>
      </div>
    </div>
   </header>
  )
}

export default Navbar