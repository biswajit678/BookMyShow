import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useTheaterStore = create((set)=>({

    shows:[],
    selectedShow:null,
    isLoading:false,

    fetchShowByMovie : async (movieId) => {
        set({isLoading: true})
        try {
            const res= await axiosInstance.get(`/show/movie/${movieId}`);
            set({shows : res.data})

        } catch (error) {
            console.log("Error in fetchShowByMovie",error.message);
            toast.error(error.response?.data?.message)
        }finally{
            set({isLoading:false    })
        }
    },
    setSelectedShow: (show) => set({selectedShow: show})
}))