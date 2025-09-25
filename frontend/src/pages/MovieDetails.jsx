import React, { useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMovieStore } from '../store/useMovieStore'
import {Loader2} from 'lucide-react'

const MovieDetails = () => {
  const {selectedMovie, fetchMovieDetails, isLoading} = useMovieStore()

  const {id} = useParams()

  useEffect(()=>{
    fetchMovieDetails(id)
  },[id,fetchMovieDetails])

 if (isLoading || !selectedMovie) return (
  <div className='flex justify-center items-center h-screen'>
    <Loader2 className='size-10 animate-spin'/>
  </div>
 )

  return (
    <div className='relative text-white min-h-screen bg-pink-50'>
    {/*Bachgroung poster */}
    <div
    className='h-96 max-w-full bg-cover bg-center relative'
    style={{backgroundImage: `url(${selectedMovie.posterUrl})`}}
    >
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
    {/*Main content */}
    <div className='max-w-6xl mx-4 -mt-95 flex gap-8 px-6 relative z-10'>
      {/*Left side poster */}
      <div className='max-w-64 flex-shrink-0 rounded-xl overflow-hidden shadow-lg'>
        <img
         src={selectedMovie.posterUrl}
          alt={selectedMovie.title} 
          className='w-full h-full object-cover'
          />
      </div>
      {/*Right details */}
      <div className='flex-1'>
        <h1 className='text-4xl font-bold mb-2 mt-5'>{selectedMovie.title}</h1>
      <div className='flex items-center gap-2 mb-4'>
        <span>⭐{selectedMovie.ratings}/10</span>
      </div>
      {/*Genre duration release */}
      <div className='flex flex-wrap gap-6 mb-4 text-gray-200'>
      <span><strong>Genre:</strong>{selectedMovie.genre}</span>
      <span><strong>Duration:</strong>{selectedMovie.duration}</span>
      <span><strong>Release:</strong>{""}
        {new Date(selectedMovie.releaseDate).toLocaleDateString("en-US",{
          year:"numeric",
          month:"long",
          day:"numeric"
        })}</span>
      </div>
      <div className=' inline-block  bg-gray-200 text-gray-700 px-3 py-1 shadow-sm'>
        <span className='text-sm font-medium'><strong>Language :  </strong>{selectedMovie.language}</span>
      </div>
      </div>
      {/*Description */}
    </div>
      <div className="max-w-4xl mx-auto mt-12 px-6">
    <h2 className="text-2xl font-bold mb-4 text-gray-700 border-b border-gray-700 pb-2">
      About the movie
    </h2>
    <p className="text-gray-500 leading-relaxed text-justify">
      {selectedMovie.description}
    </p>
  </div>
    {/*Cast section */}
    <div className='max-w-6xl mx-auto mt-5 px-40'>
        <h2 className='text-2xl font-bold mb-6 text-gray-700'>Cast</h2>
      <div className='flex gap-6 overflow-x-auto py-2'>
        {selectedMovie.cast?.map((actor,idx)=>(
          <div key={idx} className='w-24 flex-shrink-0 text-center space-y-2'>
            <img 
            src={actor.profileUrl}
            alt={actor.name}
            className='w-24 h-24 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition-transform duration-200 ' />
            <p className='text-gray-800 text-sm'>{actor.name}</p>
          </div>
        ))}
      </div>
      
    </div>
    {/*Theater section */}

   <div className="flex  gap-10 -mt-10 justify-center py-15">
      <Link
      to={`/theater/${selectedMovie._id}`}
       className="btn btn-accent btn-lg rounded-lg shadow-lg hover:brightness-125"
       >Book Tickets</Link>
      <Link
      to={`/theater/${selectedMovie._id}`}
      className="btn btn-secondary btn-lg rounded-lg shadow-lg hover:brightness-125"
      >Watch With Me</Link>
    </div>

</div>
  )
}

export default MovieDetails