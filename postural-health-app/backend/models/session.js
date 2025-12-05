import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOptionIds: [{ type: mongoose.Schema.Types.ObjectId }]
});

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionUUID: { type: String, unique: true, required: true },
  responses: [responseSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Session', sessionSchema);
