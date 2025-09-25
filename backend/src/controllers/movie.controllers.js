import Movie from "../models/movie.model.js";

export const getAllMovies = async(req,res)=>{
    try {
        const movies=await Movie.find().sort({ releaseDate: -1})
        res.status(200).json(movies)
    } catch (error) {
        console.log("Error fetching Movies",error.message);
        res.status(500).json({message:"Server Error"})
    }
}

export const getMoviesById=async(req,res)=>{
    try {
        const movie=await Movie.findById(req.params.id)
        if(!movie){
           return res.status(404).json({message:"movie not found"})
        }
        res.status(200).json(movie)
    } catch (error) {
        console.log("Error fetching movie",error.message);
        res.status(500).json({message:"Server Error"})
    }
}

export const addMovie=async(req,res)=>{
    try {
        const {
             title,
             description,
             cast,
             posterUrl,
             language,
             genre,
             releaseDate,
             duration,
             ratings   
        } = req.body

        const newMovie = new Movie({
            title,
            description,
            cast,
            posterUrl,
            language,
            genre,
            releaseDate,
            duration,
            ratings,
        })

        await newMovie.save()
        res.status(201).json(newMovie)
    } catch (error) {
        console.log("Error adding movie",error.message);
        res.status(500).json({message:"Server Error"})
    }
}
