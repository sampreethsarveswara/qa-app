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
  questions: Question[] = QUESTIONS.map((q) => ({ ...q }));
  currentIndex = 0;
  showResult = false;
  score = 0;

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

    // auto-evaluate silently if user skipped "Check"
    if (!current.isChecked && current.selectedAnswer) {
      current.isCorrect = current.selectedAnswer === current.correctAnswer;
    }

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.calculateScore();
      this.showResult = true;
    }
  }

  calculateScore() {
    this.score = this.questions.filter((q) => q.isCorrect).length;
  }

  restartQuiz() {
    this.questions = QUESTIONS.map((q) => ({
      ...q,
      selectedAnswer: undefined,
      isChecked: false,
      isCorrect: false,
    }));
    this.currentIndex = 0;
    this.score = 0;
    this.showResult = false;
  }
}
