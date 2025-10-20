import express from "express";
import { createSeats, getSeatsByTheater } from "../controllers/seat.controllers.js";
import { protectRoute } from "../middleware/user.middleware.js";

const router = express.Router();

router.get("/theater/:theaterId",protectRoute, getSeatsByTheater);

router.post("/",protectRoute, createSeats);

export default router;
