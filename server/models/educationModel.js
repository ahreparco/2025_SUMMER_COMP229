// models/educations.model.js
import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true},
  year: { type: String, required: true }
}, { collection: 'educations' });

export default mongoose.model('Educations', educationSchema);
