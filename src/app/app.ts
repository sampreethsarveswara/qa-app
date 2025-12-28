import { Component } from '@angular/core';
import { QUESTIONS } from './data/questions';
import { Question } from './models/question.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule],
})
export class AppComponent {
  // questions: Question[] = QUESTIONS.map((q) => ({ ...q }));
  // currentIndex = 0;
  // showResult = false;
  // score = 0;

  testOffsets: Record<number, number> = {
    1: 0,
    2: 62,
    3: 124,
    4: 186,
  };

  allQuestions = QUESTIONS;
  questions: Question[] = [];

  selectedTestId: number | null = null;
  showTestSelection = true;

  currentIndex = 0;
  showResult = false;
  score = 0;

  showQuestionNav = false;

  toggleQuestionNav() {
    this.showQuestionNav = !this.showQuestionNav;
  }

  questionNumberOffset = 0;

  startTest(testId: number) {
    this.selectedTestId = testId;

    this.questionNumberOffset = this.testOffsets[testId] ?? 0;

    this.questions = this.allQuestions
      .filter((q) => q.testId === testId)
      .map((q) => ({
        ...q,
        selectedAnswer: undefined,
        isChecked: false,
        isCorrect: false,
      }));

    this.currentIndex = 0;
    this.showResult = false;
    this.showTestSelection = false;
  }

  selectAnswer(answer: string) {
    const current = this.questions[this.currentIndex];
    current.selectedAnswer = answer;
  }

  checkAnswer() {
    const current = this.questions[this.currentIndex];
    if (!current.selectedAnswer || current.isChecked) return;

    current.isChecked = true;
    current.isCorrect = current.selectedAnswer === current.correctAnswer;
  }

  nextQuestion() {
    const current = this.questions[this.currentIndex];

    // auto-evaluate only if answered
    if (current.selectedAnswer && !current.isChecked) {
      current.isCorrect = current.selectedAnswer === current.correctAnswer;
    }

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.calculateScore();
      this.showResult = true;
    }
  }

  goToQuestion(index: number) {
    this.currentIndex = index;
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  calculateScore() {
    this.score = this.questions.filter((q) => q.isCorrect).length;
  }

  restartQuiz() {
    this.showTestSelection = true;
    this.selectedTestId = null;
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.showResult = false;
  }
}
