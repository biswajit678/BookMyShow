import express from 'express'
import { addShow, getShowById} from '../controllers/show.controllers.js'
import { protectRoute } from '../middleware/user.middleware.js'

const router= express.Router()

router.post("/",protectRoute,addShow)


router.get('/movie/:movieId',protectRoute,getShowById)

export default router