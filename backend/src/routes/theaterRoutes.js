import express from 'express'
import { addTheater, getAllTheaters } from '../controllers/theater.controllers.js'
import { protectRoute } from '../middleware/user.middleware.js'

const router=express.Router()

router.get("/",protectRoute,getAllTheaters)

router.post("/",protectRoute,addTheater)

export default router