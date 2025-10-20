import mongoose, { Schema } from "mongoose";

const seatSchema = new Schema({
    seatNumber:
     {
         type: String,
          required: true
 },
    type:
     {
         type: String,
         enum: ["regular", "vip"],
         default: "regular"
     },
    price:
     {
         type: Number,
        required: true
     },
    theater: 
    {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
     required: true
     }
}, { timestamps: true });

const Seat = mongoose.model("Seat", seatSchema);

export default Seat
