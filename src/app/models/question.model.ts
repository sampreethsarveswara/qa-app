export interface Question {
  question: string;
  answers: string[];
  testId: number;
  correctAnswer: string;
  selectedAnswer?: string;
  isChecked?: boolean;
  isCorrect?: boolean;
}
