import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import app from './express.js'

const PORT     = process.env.PORT     || 5000
const MONGO_URI = process.env.MONGO_URI

// 1️⃣ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')

    // 2️⃣ Only start Express server after DB is ready
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    )
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })