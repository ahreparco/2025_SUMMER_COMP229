import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import config from './config/config.js'
import authRoutes from './server/routes/auth.routes.js'
import userRoutes from './server/routes/user.routes.js'
import apiRoutes  from './server/routes/api.routes.js'
import { protect } from './server/helpers/auth.middleware.js'

dotenv.config()
const app = express()
app.use(express.json())

// DB connection
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to the database!'))
  .catch(err => console.error(err))

// Public auth routes
app.use('/auth', authRoutes)

// Public user routes (optional, usually needs protection)
app.use('/users', userRoutes)

// Example public route
app.get('/', (_, res) =>
  res.json({ message: 'Welcome to User application.' })
)

// Protected example route
app.get('/profile', protect, (req, res) => {
  res.json({ message:`Welcome user ${req.user.email}` })
})

// All API routes protected
app.use('/api', protect, apiRoutes)

// At the very end of server.js, after all your app.use(…) calls:

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Unhandled error:', err)
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' })
})

// Then start the server
app.listen(config.port, () =>
  console.log(`Server started on http://localhost:${config.port}`)
)


// Start the server (ONLY ONCE)
app.listen(config.port, () =>
  console.log(`Server started on http://localhost:${config.port}`)
)
