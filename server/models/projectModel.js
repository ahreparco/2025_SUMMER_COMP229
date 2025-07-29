// models/projects.model.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  title: { type: String, required: true},
  description: { type: String }
});
 
export default mongoose.model('Project', projectSchema);
