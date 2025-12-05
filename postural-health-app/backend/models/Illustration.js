import mongoose from 'mongoose';

const illustrationSchema = new mongoose.Schema({
  profileName: { type: String, required: true }, // e.g., "Beginner Yoga"
  images: [{ type: String, required: true }],   // array of image URLs or paths
});

export default mongoose.model('Illustration', illustrationSchema);
