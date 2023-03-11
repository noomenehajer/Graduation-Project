import { Component, Input } from '@angular/core';
import { Question } from '../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input() question: Question = {
    text: '',
    type: 'text'
  };

  onAddOption(): void {
    this.question.options = this.question.options || [];
    this.question.options.push('');
  }

  onDeleteOption(index: number): void {
    this.question?.options?.splice(index, 1);
  }

}
