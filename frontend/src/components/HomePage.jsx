import React from "react"
import { useMovieStore } from "../store/useMovieStore"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  const{movies,fetchMovies} = useMovieStore()

  useEffect(()=>{
    fetchMovies()
  },[fetchMovies])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Recommended Movies</h1>
      <div className="flex space-x-4 overflow-x-auto  scrollbar-hide">
      {movies.map((movie)=>(
        <Link
         to={`/movie/${movie._id}`}
         key={movie._id}
         className="bg-white rounded-t-lg shadow-md hover:shadow-xl transition p-2"
         >
        
          <div className="w-full aspect-[2/3] h-72 overflow-hidden rounded-t-lg bg-black/100">
            <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full object-cover"
        />
          </div>
         <p className="text-white bg-black">⭐{movie.ratings}/10</p>
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-gray-500 text-sm">{movie.genre}</p>
        </Link>
      ))}
      </div>
    </div>
  )
}

export default HomePage