import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://bookmyshow-4-3ta0.onrender.com/api",
    withCredentials: true
})