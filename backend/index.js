import express from "express"
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import theaterRoutes from './routes/theaterRoutes.js'
import showRoutes from './routes/showRoutes.js'
import seatRoutes from './routes/seatRoutes.js'
import { connectDB } from "./lib/db.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app=express()

const PORT= process.env.PORT || 3000

app.use(express.json())

app.use(cookieParser())
app.use(cors({
    origin: "https://book-my-show-g3ci.vercel.app",
    credentials: true
}))

app.use("/api/auth",authRoutes)
app.use("/api/movie",movieRoutes)
app.use("/api/theater",theaterRoutes)
app.use("/api/show",showRoutes)
app.use("/api/seat", seatRoutes);


connectDB()
app.listen(PORT,()=>{
    console.log('Server is running on PORT:'+ PORT);
})