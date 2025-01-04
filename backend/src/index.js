
import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from "@clerk/express";

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


// parsing requests
app.use(express.json())
// clerk middleware will appear auth to req object
app.use(clerkMiddleware());


app.use('/api/users/',userRoutes)
app.use('/api/admin/',adminRoutes)
app.use('/api/auth/',authRoutes)
app.use('/api/songs/',songRoutes)
app.use('/api/albums/',albumRoutes)
app.use('/api/stats/',statRoutes)

app.listen(port,()=>{
  connectToMongoDB()
  console.log(`Server running at PORT:${port}`)
})
