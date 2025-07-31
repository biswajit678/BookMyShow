# 🚀 Movie App Deployment Guide

This guide will help you deploy your Movie App to Vercel (frontend) and Render (backend).

## 📋 Prerequisites

1. **GitHub Account**: Make sure your code is pushed to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Render Account**: Sign up at [render.com](https://render.com)
4. **MongoDB Atlas**: Set up a free MongoDB database at [mongodb.com](https://mongodb.com)

## 🗄️ Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://mongodb.com)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

## ⚙️ Step 2: Deploy Backend to Render

### 2.1 Connect to Render
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### 2.2 Configure the Service
- **Name**: `movie-app-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 2.3 Set Environment Variables
In Render dashboard, go to "Environment" tab and add:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `NODE_ENV`: `production`

### 2.4 Deploy
Click "Create Web Service" and wait for deployment. Note the URL (e.g., `https://your-app.onrender.com`)

## 🌐 Step 3: Deploy Frontend to Vercel

### 3.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository

### 3.2 Configure the Project
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3.3 Set Environment Variables
In Vercel dashboard, go to "Settings" → "Environment Variables" and add:
- `VITE_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com`)

### 3.4 Deploy
Click "Deploy" and wait for deployment. Your app will be available at `https://your-app.vercel.app`

## 🔧 Step 4: Update Frontend API URL

After getting your Render backend URL, update the environment variable in Vercel:
1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Update `VITE_API_URL` with your Render backend URL
4. Redeploy the project

## 🧪 Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Try to sign up/login
3. Check if the movie list loads
4. Test the logout functionality

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend CORS is configured properly
2. **Database Connection**: Verify your MongoDB Atlas connection string
3. **Environment Variables**: Double-check all environment variables are set correctly
4. **Build Errors**: Check the build logs in both Vercel and Render

### Debug Commands:
- Check Render logs: Go to your service → "Logs"
- Check Vercel logs: Go to your project → "Functions" → "View Function Logs"

## 📝 Notes

- The frontend will automatically use the environment variable `VITE_API_URL` for API calls
- The backend will use the `MONGO_URI` environment variable for database connection
- Both services will automatically redeploy when you push changes to GitHub

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com) 