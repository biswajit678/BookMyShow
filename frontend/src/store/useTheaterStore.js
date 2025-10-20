import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useTheaterStore = create((set)=>({

    shows:[],
    theaters:[],
    selectedShow:null,  
    isLoading:false,

    fetchTheaters: async (movieId) => {
        set({isLoading:true})
        try {
            const res = await axiosInstance.get(`/theater`)
            set({theaters:res.data})
        } catch (error) {
            console.log("Error in Fetch Theater",error.message);
            toast.error(error.response?.data?.message)
        }finally{
            set({isLoading:false})
        }
    },

    fetchShowByMovie : async (movieId) => {
       
        try {
            const res= await axiosInstance.get(`/show/movie/${movieId}`);
            set({shows : res.data})

        } catch (error) {
            console.log("Error in fetchShowByMovie",error.message);
            toast.error(error.response?.data?.message)
        }
    },
    setSelectedShow: (show) => set({selectedShow: show})

    
}))