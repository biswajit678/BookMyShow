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

// Debug endpoint to see all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

connectDB();
app.use('/api/auth',authRoutes)

// Catch-all route for undefined endpoints
app.use('*', (req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
        message: 'Route not found', 
        method: req.method, 
        url: req.originalUrl 
    });
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
})

