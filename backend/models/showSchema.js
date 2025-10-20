import mongoose, { Schema } from "mongoose";

const showSchema = new Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    times: {
        type: [String],
        default: []
    }
},{timestamps: true})

const Show = mongoose.model("Show",showSchema)

export default Show