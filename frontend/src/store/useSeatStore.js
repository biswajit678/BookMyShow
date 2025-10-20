import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSeatStore = create((set)=>({
    seats : [],
    isLoading : false,
    selectedSeats : [],

    fetchSeatsByTheater : async (theaterId)=>{
        set({isLoading: true})
        try {
            const res = await axiosInstance.get(`/seat/theater/${theaterId}`)
            set({seats: res.data})
        } catch (error) {
            console.log("Error in fetch Seats",error.message);
            toast.error(error.response?.data?.message)
        }finally{
            set({isLoading: false})
        }
    },
    toogleSeat : (seatNumber) =>  {
        set((state)=>{
            if(state.selectedSeats.includes(seatNumber)){
                return{
                 selectedSeats : state.selectedSeats.filter((seats)=>seats !== seatNumber)
            }
        }
        if(state.selectedSeats.length >=8){
            toast.error("You can Select maximum 8 Seats")
            return state
        }
        return {
            selectedSeats : [...state.selectedSeats, seatNumber]
        }
        })
    }
}))