import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheaterStore } from "../store/useTheaterStore";
import { Loader2 } from "lucide-react";
import { useMovieStore } from "../store/useMovieStore";

const TheaterPage = () => {
  const { movieId } = useParams();
  const { shows, fetchShowByMovie, isLoading, selectedShow, setSelectedShow } = useTheaterStore();
  const { selectedMovie, fetchMovieDetails } = useMovieStore();

  useEffect(() => {
    fetchShowByMovie(movieId);
    fetchMovieDetails(movieId);
  }, [movieId, fetchShowByMovie, fetchMovieDetails]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin size-10 text-red-500" />
      </div>
    );
  }

  if (!shows || shows.length === 0) {
    return <p className="text-xl text-gray-700 text-center mt-10">No shows available</p>;
  }

  const groupedShows = shows.reduce((acc, show) => {
    const theaterId = show.theater?._id || "unknown";
    if (!acc[theaterId]) {
      acc[theaterId] = {
        theater: show.theater,
        shows: [],
      };
    }
    acc[theaterId].shows.push(show);
    return acc;
  }, {});

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-6">
      {/* Movie Header */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-5 border border-gray-200">
        <h2 className="text-4xl font-bold text-gray-700">
          {selectedMovie.title}{" "}
          <span className="text-gray-700 text-lg">({selectedMovie.language})</span>
        </h2>
        <div className="flex gap-3 mt-4 flex-wrap text-sm">
          <span className="px-3 py-1  text-gray-600 rounded-full border border-gray-600">
            {selectedMovie.duration}
          </span>
          <Link
          
          className="px-3 py-1  text-gray-600 rounded-full border border-gray-600">
            {selectedMovie.genre}
          </Link>
        </div>
      </div>

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
                <p className="text-sm text-gray-500">{theater.location}</p>
              </div>
            </div>

            {/* Show date buttons */}
            <div className="flex gap-6 flex-wrap ">
              {shows.map((show) => {
                const isActive = selectedShow?._id === show._id;
                return (
                  <button
                    key={show._id}
                    onClick={() => setSelectedShow(show)}
                    className={`px-5 py-2 rounded-lg  text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-green-500 text-white shadow-md scale-105"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {new Date(show.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </button>
                );
              })}
            </div>

            {/* Continue buttons for selected show */}
            {selectedShow && selectedShow.theater?._id === theater._id && (
              <div className="flex justify-start gap-4 mt-6">
                <Link
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-br-selector transition"
                >
                  Continue
                </Link>
                <Link
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
