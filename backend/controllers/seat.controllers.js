import mongoose from "mongoose";
import Seat from "../models/seat.model.js";

// GET seats by theater
export const getSeatsByTheater = async (req, res) => {
    try {
        const { theaterId } = req.params;
        if(!theaterId) {
            return res.status(400).json({ message: "Invalid theater ID" });
        }
        const seats = await Seat.find({ theater: theaterId }).populate("theater");
        res.status(200).json(seats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch seats" });
    }
};

export const createSeats = async (req, res) => {
    try {
        const seatData = req.body.seats; 
        if(!seatData || seatData.length === 0){
            return res.status(400).json({ message: "No seats provided" });
        }
        const createdSeats = await Seat.insertMany(seatData);
        res.status(201).json(createdSeats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create seats" });
    }
};