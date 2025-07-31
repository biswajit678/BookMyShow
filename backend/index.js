const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDB=require('./db')
const authRoutes=require('./routes/auth');

dotenv.config();

const app=express()
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Movie App API is running' });
});

connectDB();
app.use('/api/auth',authRoutes)

const PORT=process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server accessible at: http://localhost:${PORT}`);
    console.log(`For other devices, use your computer's IP address`);
})

