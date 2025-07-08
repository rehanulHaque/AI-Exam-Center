import mongoose from 'mongoose';

const userAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  answer: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: [true, 'Answer is required']
  }
});

const userResponseSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: [true, 'Quiz reference is required']
  },
  userName: {
    type: String,
    required: false
  },
  answers: {
    type: [userAnswerSchema],
    validate: {
      validator: (arr: any) => arr.length === 10,
      message: 'Answers array must contain exactly 10 answers'
    }
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export const UserResponse = mongoose.models.UserResponse || mongoose.model('UserResponse', userResponseSchema);
