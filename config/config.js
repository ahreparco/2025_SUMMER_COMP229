import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri:
    process.env.MONGO_URI ||
    process.env.MONGO_URI ||
    process.env.MONGO_HOST ||
    'mongodb://localhost:27017/mernproject'
}

export default config
