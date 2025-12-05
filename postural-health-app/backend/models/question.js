import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['single_choice','multiple_choice'], required: true },
  options: [optionSchema]
});

export default mongoose.model('Question', questionSchema);
