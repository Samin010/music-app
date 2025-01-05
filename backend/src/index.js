
import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from 'path'


import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import songRoutes from './routes/song.route.js'
import albumRoutes from './routes/album.route.js'
import statRoutes from './routes/stat.route.js'
import { connectToMongoDB } from './db/db.js'

dotenv.config()


const app=express()
const port=process.env.PORT || 3000
const __dirname=path.resolve()

// parsing requests
app.use(express.json())
// clerk middleware will appear auth to req object
app.use(clerkMiddleware());
// middleware for file uploading and storing them temporarily in the tmp folder
app.use(fileupload({
  useTempFiles:true,
  tempFileDir:path.join(__dirname,'tmp'),
  createParentPath:true,
  // 10 Mb max size
  limits:{fileSize:10*1024*1024}
}))


app.use('/api/users/',userRoutes)
app.use('/api/admin/',adminRoutes)
app.use('/api/auth/',authRoutes)
app.use('/api/songs/',songRoutes)
app.use('/api/albums/',albumRoutes)
app.use('/api/stats/',statRoutes)

// error handler
app.use((error, req, res, next)=>{
  res.status(500).json({message:process.env.NODE_ENV === 'production' ? 'Internal server error':error.message})
});

app.listen(port,()=>{
  connectToMongoDB()
  console.log(`Server running at PORT:${port}`)
})
