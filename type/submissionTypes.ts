export interface SubmissionTypes {
  answers: [
    {
      question: string;
      answer: "A" | "B" | "C" | "D";
      _id: string;
    }
  ];
  submittedAt: Date;
  userName: string;
  quizId: string;
  _id: string;
}
export interface SubmissionResponseTypes {
  userName: string;
  submittedAt: Date;
  correctAnswers: number;
  totalQuestions: number;
  id: string;
}
