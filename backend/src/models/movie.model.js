import mongoose, { Schema } from "mongoose";

const movieSchema= new Schema ({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    cast:[
        {
            name:{
                type:String,
                required:true
            },
            profileUrl:{
                type:String,
                require:true
            }
        }
    ],

    posterUrl:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        min:0,
        max:10
    }
    
},{timestamps:true})

const Movie= mongoose.model("Movie",movieSchema)

export default Movie