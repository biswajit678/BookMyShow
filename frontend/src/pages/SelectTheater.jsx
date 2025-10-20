import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheaterStore } from "../store/useTheaterStore";
import { Loader2, MapPin } from "lucide-react";
import { useMovieStore } from "../store/useMovieStore";

const TheaterPage = () => {
  const { movieId } = useParams();
  const { shows, fetchShowByMovie, isLoading, selectedShow, setSelectedShow ,fetchTheaters,theaters} = useTheaterStore();
  const { selectedMovie, fetchMovieDetails } = useMovieStore();

  useEffect(() => {
    fetchTheaters()
    fetchShowByMovie(movieId);
    fetchMovieDetails(movieId);
  }, [movieId, fetchShowByMovie, fetchMovieDetails,fetchTheaters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin size-10 text-red-500" />
      </div>
    );
  }

  const groupedShows = theaters.map((theater)=>{
    return {
      theater,
      shows:shows.filter((show)=> show.theater?._id ===theater._id)
    }
  })
  
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-6">
      {/* Movie Header */}
     {selectedMovie ? (
  <div className="bg-white shadow-md rounded-2xl p-6 mb-5 border border-gray-200">
    <h2 className="text-4xl font-bold text-gray-800 mb-2">
      {selectedMovie.title}{" "}
      <span className="text-gray-700 text-lg">({selectedMovie.language})</span>
    </h2>
    <div className="flex gap-3 mt-4 flex-wrap text-sm">
      <span className="px-3 py-1 text-gray-600 rounded-full border border-gray-600">
        {selectedMovie.duration}
      </span>
      <Link
        to="/"
        className="px-3 py-1 text-gray-600 rounded-full border border-gray-600 underline hover:text-green-700"
      >
        {selectedMovie.genre}
      </Link>
    </div>
  </div>
) : (
  <div className="bg-white shadow-md rounded-2xl p-6 mb-5 border border-gray-200">
    <p className="text-gray-500">Loading movie details...</p>
  </div>
)}
      {/* Theaters and Shows */}
      <div className="space-y-6">
        {Object.values(groupedShows).map(({ theater, shows }) => (
          <div
            key={theater._id}
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-xl transition"
          >
            {/* Theater Info */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-300 pb-4">
              <img
                className="rounded-md w-8 h-8 border border-gray-300"
                src="https://placehold.co/48x48/EEE/333?text=Theater"
                alt="Theater Logo"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{theater.name}</h3>
               <div className="flex items-center gap-0.5 text-sm text-gray-500">
                <MapPin size={14} className="text-gray-00"/>
                <span>{theater.location}</span>
               </div>
              </div>
            </div>

            {/* Show date buttons */}
         <div className="flex gap-6 flex-wrap">
            {shows.map((show) => {
              const isDateActive = selectedShow?._id === show._id; // just for highlighting times
              return (
                <div key={show._id} className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedShow({ ...show, timesOnlySelected: false })}
                    className={`px-5 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                      isDateActive ? "bg-green-500 text-white" : "border border-gray-300"
                    }`}
                  >
                    {new Date(show.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </button>

                  {/* Show times */}
                  {isDateActive && (
                    <div className="flex gap-3 mt-2 flex-wrap">
                      {show.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedShow({ ...show, selectedTime: time })}
                          className={`px-4 py-2 rounded-lg text-sm border cursor-pointer ${
                            selectedShow?.selectedTime === time
                              ? "bg-blue-500 text-white"
                              : "border-gray-300 text-gray-700"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

           </div>
            {/* Continue buttons for selected show */}
            {selectedShow?.selectedTime && selectedShow.theater?._id === theater._id && (
                
              <div className="flex justify-start gap-4 mt-6">
                <Link
                to={`/seats/${theater._id}`}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-br-selector transition"
                >
                  Continue
                </Link>
                <Link
                to='/buddy'
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-br-selector transition"
                >
                  Watch With Me
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterPage;
  