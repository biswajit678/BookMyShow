import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMovieStore = create((set)=>({
    movies: [],
    selectedMovie :null,
    isLoading :null,

    fetchMovies: async()=>{
        try {
            const res = await axiosInstance.get("/movie/")
            set({movies: res.data})
        } catch (error) {
           toast.error(error.response?.data?.message || "Error fetching movies");
        }finally{
            set({isLoading:false})
        }
    },
    fetchMovieDetails: async(id)=>{
        set({isLoading:true})
        try {
            const res= await axiosInstance.get(`/movie/${id}`)
             console.log("Fetched movie:", res.data); //
            set({selectedMovie:res.data})
            
        } catch (error) {
           toast.error(error.response?.data?.message || "Error fetching movie details");
        }finally{
            set({isLoading:false})
        }
    }
}))