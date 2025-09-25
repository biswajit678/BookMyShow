import React, { useState } from 'react'
import {Eye, EyeOff,Loader, Lock, Mail, MessageSquare, User} from 'lucide-react'
import {Link} from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

const Login = () => {
  const [showPassword, setShowPassword]= useState(false)
  const {login, isLoggingIn}= useAuthStore()
  const [formData, setFormdata]= useState({
    email:'',
    password:''
  })
  const validateForm= ()=>{
      if(!formData.email.trim()) return toast.error("Email is required")
        if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
          if(!formData.password.trim()) return toast.error("Password is required")
            if(formData.password.length<6) return toast.error("Password must be at least 6 character")
              return true
  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    const success= validateForm()
    if(success) login(formData)
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6 sm:p-12'>
      <div className='w-full max-w-lg space-y-8 bg-base-100 drop-shadow-lg rounded-2xl p-8'>
        <div className='w-full max-w-md space-y-8'>
          {/*Meeage Logo */}
          <div className='flex flex-col items-center gap-2 group:'>
            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
              <MessageSquare className='size-6 text-pink-400 animate-bounce'/>
            </div >
            <h1 className='text-2xl font-bold mt-2'>Sign In</h1>
          </div>
          {/*Signup form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/*Email */}
            <div>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <Mail className='size-5 text-base-content/40'/>
                </div>
                <input 
                 type='email'
                 placeholder='johndoe@gmail.com'
                 value={formData.email}
                 onChange={(e)=>{setFormdata({...formData,email:e.target.value})}}
                 className={`input input-success w-full pl-10`}
                />
              </div>
            </div>
            {/*Password */}
            <div>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <Lock className='size-5 text-base-content/40'/>
                </div>
                <input
                type={showPassword ? "text" : "password"}
                placeholder='password'
                value={formData.password}
                onChange={(e)=>{setFormdata({...formData,password:e.target.value})}}
                className={`input input-success w-full pl-10`}
                /> 
                <button
                 type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={()=>setShowPassword(!showPassword)}
                 >
                  {showPassword ?
                  (<EyeOff className='size-5 text-base-content/40'/>) : (<Eye className='size-5 text-base-content/40'/>)}
                </button> 
              </div>
            </div>
            {/*Submit */}
            <button
             type='submit'
             className='btn btn-primary w-full'
             disabled={isLoggingIn}
             >
              {isLoggingIn ? 
              (<>
              <Loader className='size-5 animate-spin'/>
              Loading...
              </>) : ("Login")}
            </button>
          </form>
          <div>
            <p>
              Don't have an Account? {""}
              <Link to='/signup' className='link link-primary'>signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login