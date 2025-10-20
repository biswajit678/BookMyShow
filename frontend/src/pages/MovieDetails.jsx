import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovieStore } from '../store/useMovieStore';
import { Loader2, Star, PlayCircle } from 'lucide-react';

const MovieDetails = () => {
  const { selectedMovie, fetchMovieDetails, isLoading } = useMovieStore();
  const { id } = useParams();

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id, fetchMovieDetails]);

  if (isLoading || !selectedMovie) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Loader2 className="size-10 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-600 sm:text-white bg-pink-50 font-sans">
      {/* Background poster with gradient overlay */}
      <div
        className="h-[40vh] md:h-[50vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${selectedMovie.posterUrl})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto md:-mt-[45vh] flex flex-col md:flex-row gap-6 px-4 md:px-6 relative z-10">
        {/* Left side poster */}
        <div className="w-full md:w-64 flex-shrink-0 rounded-xl overflow-hidden shadow-lg mx-auto md:mx-0 ">
          <img
            src={selectedMovie.posterUrl}
            alt={selectedMovie.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right details */}
        <div className="flex-1 p-4 md:p-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedMovie.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>{selectedMovie.ratings}/10</span>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 mb-9 text-gray-100 sm:text- md:text-base">
            <span className="bg-gray-700 rounded-full px-3 py-1">
              {selectedMovie.language}
            </span>
            <span className="bg-gray-700 rounded-full px-3 py-1">
              {selectedMovie.duration}
            </span>
            <span className="bg-gray-700 rounded-full px-3 py-1">
              {selectedMovie.genre}
            </span>
          </div>
          <p className="text-gray-700 sm:text-gray-300 leading-relaxed mb-6">
            {selectedMovie.description}
          </p>
          <div className="px-2 py-5">
            <Link
              to={`/theater/${selectedMovie._id}`}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors text-center cursor-pointer"
            >
              Book Tickets
            </Link>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-7xl mx-auto mt-8 px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Cast</h2>
        <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {selectedMovie.cast?.map((actor, idx) => (
            <div key={idx} className="w-24 flex-shrink-0 text-center cursor-pointer ">
              <img
                src={actor.profileUrl}
                alt={actor.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
              />
              <p className="text-gray-700 text-sm line-clamp-1">{actor.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-20"></div> {/* bottom spacing */}
    </div>
  );
};

export default MovieDetails;
