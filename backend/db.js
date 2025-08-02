const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        if (!process.env.MONGO_URI) {
            console.log('MONGO_URI environment variable is not set');
            return;
        }
        await mongoose.connect(process.env.MONGO_URI,{
        })
        console.log('mongodb connected');
    }catch(err){
        console.log('mongodb connection failed',err.message);
        // Don't exit the process, just log the error
        console.log('Server will continue without database connection');
    }
}

module.exports=connectDB