import monoggse from 'mongoose'

export const connectDB = async()=>{
    try {
        const conn= await monoggse.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connection error:",error);
            
    }
}