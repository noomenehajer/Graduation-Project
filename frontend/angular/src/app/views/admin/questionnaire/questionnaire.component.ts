import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators , FormArray} from '@angular/forms';
import { Form } from 'src/app/models/form';
import { Question } from 'src/app/models//question';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  forms!: Form[];
  questions!: Question[];
  selectedForm!: Form;
  newFormForm: FormGroup;
  newQuestionForm: FormGroup;
  error!: string;

  /////////////////////
  questionTypes = [
    { value: 'checkbox', label: 'Cases à cocher' },
    { value: 'multiple-choice', label: 'Choix multiples' },
    { value: 'short-answer', label: 'Réponse courte' },
    { value: 'paragraph', label: 'Paragraphe' }
  ];
  /////////////////////

  constructor(private questionnaireService: QuestionnaireService, public fb: FormBuilder) {
    this.newFormForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.newQuestionForm = this.fb.group({
      text: ['', Validators.required],
      type: ['', Validators.required],
      options: ['']
    });
  }

  ngOnInit(): void {
    this.getForms();
  }

  getForms(): void {
    this.questionnaireService.getForms().subscribe(
      forms => {
        this.forms = forms;
        if (forms.length > 0) {
          this.selectedForm = forms[0];
          this.getQuestions(this.selectedForm._id);
        }},
      error => this.error = error.message
    );
  }

  getQuestions(formId: string): void {
    this.questionnaireService.getQuestions(formId).subscribe(
      questions => this.questions = questions,
      error => this.error = error.message
    );
  }

  createForm(): void {
    const { title, description } = this.newFormForm.value;
    this.questionnaireService.createForm(title, description).subscribe(
      form => {
        this.forms.push(form);
        this.selectedForm = form;
        this.newFormForm.reset();
      },
      error => this.error = error.message
    );
  }

  deleteForm(formId: string): void {
    this.questionnaireService.deleteForm(formId).subscribe(
      () => this.forms = this.forms.filter(f => f._id !== formId),
      error => this.error = error.message
    );
  }

  //updateForm
  updateForm(formId: string): void {
    const { title, description } = this.newFormForm.value;
    this.questionnaireService.updateForm(formId).subscribe(
      () => this.forms = this.forms.filter(f => f._id !== formId),
      error => this.error = error.message
    );
  }
  createQuestion(): void {
    const { text, type, options } = this.newQuestionForm.value;
    this.questionnaireService.createQuestion(this.selectedForm._id, text, type, options).subscribe(
      question => {
        if (!this.questions) {
          this.questions = [];
        }
        this.questions.push(question);
        this.newQuestionForm.reset();
      },
      error => this.error = error.message
    );
  }


  deleteQuestion(questionId: string): void {
    this.questionnaireService.deleteQuestion(this.selectedForm._id, questionId).subscribe(
      () => this.questions = this.questions.filter(q => q._id !== questionId),
      error => this.error = error.message
    );
  }


  options: string[] = [];

  addOption() {
    const optionsFormArray = this.newQuestionForm.controls['options'] as FormArray;
    this.options.push(optionsFormArray.value);
    optionsFormArray.reset();
}

removeOption(index: number) {
    this.options.splice(index, 1);
}

removeAllOptions() {
  this.options = [];
}
}
