export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
  selectedAnswer?: string;
  isChecked?: boolean;
  isCorrect?: boolean;
}
