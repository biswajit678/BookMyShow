import Theater from "../models/theater.model.js"

export const getAllTheaters = async (req,res)=>{
    try {
        const theaters = await Theater.find();
        res.status(200).json(theaters)
    } catch (error) {
        console.log("Error fetching theaaters",error.message);
        res.status(500).json({message:"Server Error"})
    }
}

export const addTheater = async (req,res)=>{
    try {
        const {name,location,screens}=req.body

        if (!name || !location) {
            return res.status(400).json({ message: "Name and location are required." });
        }
        const theater = new Theater({name,location,screens})
        await theater.save()
        res.status(201).json(theater)
    } catch (error) {
        console.log("Error Adding Theater",error.message);
        res.status(500).json({message:"Server Error"})
    }
}