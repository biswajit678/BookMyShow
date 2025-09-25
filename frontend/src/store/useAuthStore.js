import { create } from "zustand";
import toast from 'react-hot-toast'
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set)=>({
    
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth: true,

    checkAuth :async ()=>{
        try {
            const res= await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.log('Error in checkAuth',error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup :async (data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("Signup Successful")
        } catch (error) {
            toast.error(error.response?.data?.message || "Error in Signup")
        }finally{
            set({isSigningUp:false})
        }
    },
    login :async (data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success("Login Successful")
        } catch (error) {
            toast.error(error.response?.data?.message || "Error in Login")
        }finally{
            set({isLoggingIn:false})
        }
    },
    logout :async()=>{
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser:null})
            toast.success("Logged out Successfully")

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    updateProfile :async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res= await axiosInstance.put("/auth/updateProfile",data)
            set({authUser:res.data})
            toast.success("Updated Profile Picture Successfully")
        } catch (error) {
            console.log("Error in update",error.message);

            toast.error(error.response.data.message)
        }finally{
            set({isUpdatingProfile:false})
        }
    }

}))