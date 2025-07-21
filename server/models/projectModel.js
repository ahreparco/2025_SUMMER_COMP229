import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  firstname:   { type: String, required: true },
  lastname:    { type: String, required: true },
  email:       { type: String, required: true },
  completion:  { type: Date   },
  description: { type: String }
}, {
  timestamps: true
})

export default mongoose.model('Project', projectSchema)
