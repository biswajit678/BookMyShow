import mongoose, { Schema } from "mongoose";

const theaterSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    location:{
        type: String,
        required: true
    },
    screens:{
        type: Number,
        default: 1
    },
    
},{timestamps : true})

const Theater = mongoose.model("Theater",theaterSchema)

export default Theater