export interface MCQResponse {
  message: string;
  data: MCQData;
}

export interface MCQData {
  _id: string;
  adminName: string;
  topic: string;
  level: string;
  questions: Question[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface Question {
  _id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: 'A' | 'B' | 'C' | 'D';
}
