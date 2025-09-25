import Show from "../models/showSchema.js"

export const addShow = async (req,res)=>{
    try {
        const {movie, theater, date, times} = req.body

        const show = new Show({movie, theater, date, times})
        await show.save()
        res.status(201).json(show)
    } catch (error) {
        console.log("Error Adding Show",error.message);
        res.status(500).json({message:"Server Error"})
    }
}

export const getShowById = async (req,res)=>{
    try {
        const {movieId}= req.params;
        const today= new Date()
        const fourDaysLater= new Date()
        fourDaysLater.setDate(today.getDate()+4);

        const shows= await Show.find({
            movie : movieId,
            date : {
                $gte: today.toISOString().slice(0,10),
                $lte: fourDaysLater.toISOString().slice(0,10)
            }
        }).populate("movie","title posterUrl").populate("theater")

        res.status(200).json(shows)

    } catch (error) {
        console.log("Error Fetching Shows", error.message);
        res.status(500).json({message:"Server Error"})
    }
}