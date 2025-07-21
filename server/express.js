import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import authRoutes from './routes/auth.routes.js'
import apiRoutes  from './routes/api.routes.js'

dotenv.config()

const app = express()

// 1. Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

// 2. Security and performance middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    credentials: true
  })
)
app.use(compress())

// 3. Body parsing and cookies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// 4. Mount routes
//   All auth endpoints live under /auth
app.use('/auth', authRoutes)
//   All your CRUD endpoints live under /api
app.use('/api', apiRoutes)

// 5. Error handler (keep this last)
app.use((err, req, res, next) => {
  console.error(err)
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' })
  }
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

export default app