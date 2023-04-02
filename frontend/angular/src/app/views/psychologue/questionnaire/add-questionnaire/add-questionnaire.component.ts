import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
@Component({
  selector: 'app-add-questionnaire',
  templateUrl: './add-questionnaire.component.html',
  styleUrls: ['./add-questionnaire.component.css']
})
export class AddQuestionnaireComponent implements OnInit {
  questionnaireForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.questionnaireForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      questions: this.fb.array([])
    });
    this.addQuestion();
  }

  get questions() {
    return this.questionnaireForm.get('questions') as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      text: ['', Validators.required],
      type: ['checkbox', Validators.required],
      options: this.fb.array([])
    });
    this.questions.push(question);
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getOptions(questionIndex: number) {
    return this.questions.controls[questionIndex].get('options') as FormArray;
  }

  addOption(questionIndex: number) {
    const option = this.fb.group({
      text: ['', Validators.required]
    });
    this.getOptions(questionIndex).push(option);
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  onSubmit() {
    const questionnaire = this.questionnaireForm.value;
    this.questionnaireService.createQuestionnaire(questionnaire)
      .subscribe(() => {
        this.router.navigate(['psy/questionnaire']);
      });
  }
}