import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true }
  },
  answer: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true
  }
});

const quizSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  questions: {
    type: [questionSchema],
    validate: [(arr: any) => arr.length === 10, 'Must contain exactly 10 questions']
  }
}, {
  timestamps: true
});

export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);