import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['User','Admin'], default: 'User' }
}, {
  timestamps: true
})

// hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

// compare plain password to hash
userSchema.methods.authenticate = function(plain) {
  return bcrypt.compare(plain, this.password)
}

export default mongoose.model('User', userSchema)
