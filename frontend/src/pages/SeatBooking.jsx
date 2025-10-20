import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSeatStore } from "../store/useSeatStore";

const SeatBooking = () => {
  const { theaterId } = useParams();
  const navigate = useNavigate();
  const { seats, selectedSeats, isLoading, fetchSeatsByTheater, toogleSeat } = useSeatStore();
  const [isPaying, setIsPaying] =useState(false)
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (theaterId) fetchSeatsByTheater(theaterId);
  }, [theaterId, fetchSeatsByTheater]);

  useEffect(() => {
    const totalAmount = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
    setTotal(totalAmount);
  }, [selectedSeats]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin size-10 text-red-500" />
      </div>
    );
  }

  const groupedSeats = seats.reduce((acc, seat) => {
    const row = seat.seatNumber[0];
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});

  const handlePayment = () => {
    if(isPaying) return;
    setIsPaying(true)
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat!");
      return;
    }
    alert("Confirm Seats:" +selectedSeats.map(s=>s.seatNumber).join(",").toString()+ "\nTotal Amount:"+total )
    toast.loading("Processing payment...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Successfully Booked Seats 🎉");
      navigate("/");
    }, 3000);
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-6xl mx-auto text-center bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-pink-600">
        Select Your Seats
      </h1>

      {/* Seats Layout */}
      <div className="flex flex-col items-center gap-3 w-full overflow-x-auto">
        {Object.keys(groupedSeats).map((row) => (
          <div
            key={row}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-4 w-full"
          >
            {groupedSeats[row].map((seat) => {
              const isSelected = selectedSeats.some((s) => s._id === seat._id);
              return (
                <button
                  key={seat._id}
                  onClick={() => toogleSeat(seat)}
                  className={`w-10 h-10 sm:w-10 sm:h-10 border-2 rounded text-sm font-semibold flex flex-col justify-center items-center cursor-pointer ${
                    isSelected
                      ? "bg-green-500 hover:bg-green-700 text-white scale-105"
                      : "bg-white hover:bg-gray-100 text-gray-600 border-green-500"
                  }`}
                >
                  <span>{seat.seatNumber}</span>
                  <span className="text-[10px] sm:text-xs">₹{seat.price}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Screen */}
      <div className="w-full max-w-xl mx-auto mt-10 px-4">
        <img
          className="w-full h-10 sm:h-28 md:h-10 object-cover rounded-md"
          src="https://c8.alamy.com/comp/2B0TX2R/movie-premiere-event-at-cine-theatre-cinema-white-blank-screen-at-movie-hall-interior-with-empty-seats-vector-background-2B0TX2R.jpg"
          alt="screen"
        />
        <p className="text-sm text-gray-400 mt-2">All eyes this way please</p>
      </div>

      {/* Payment Section */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 sm:p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto">
        <div className="text-base sm:text-lg font-semibold text-gray-700">
          Selected Seats:{" "}
          <span className="text-pink-500">
            {selectedSeats.map((s) => s.seatNumber).join(", ") || "None"}
          </span>
        </div>
        <button
          onClick={handlePayment}
          disabled={isPaying}
          className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all cursor-pointer"
        >
          Pay ₹{total}
        </button>
      </div>

      {/* Legend */}
      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-gray-300 rounded"></span> Regular
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-yellow-400 rounded"></span> VIP
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-green-500 rounded"></span> Selected
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
