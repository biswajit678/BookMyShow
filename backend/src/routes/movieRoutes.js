import express from 'express'
import { addMovie, getAllMovies, getMoviesById } from '../controllers/movie.controllers.js'
import { protectRoute } from '../middleware/user.middleware.js'

const router=express.Router()

router.get("/",protectRoute,getAllMovies)

router.get("/:id",protectRoute,getMoviesById)

router.post("/",protectRoute,addMovie)

export default router
