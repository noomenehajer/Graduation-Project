import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { Questionnaire } from 'src/app/models/questionnaire';

@Component({
  selector: 'app-edit-questionnaire',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.css']
})
export class EditQuestionnaireComponent  implements OnInit {
  questionnaireForm!: FormGroup;
  questionnaireId!: string;
  questionnaire!: Questionnaire;

  constructor(
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.questionnaireForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      questions: this.fb.array([])
    });

    this.activatedRoute.params.subscribe(params => {
      this.questionnaireId = params['id'];
      this.questionnaireService.getQuestionnaireById(this.questionnaireId)
        .subscribe(questionnaire => {
          this.questionnaire = questionnaire;
          this.questionnaireForm.patchValue({
            title: questionnaire.title,
            description: questionnaire.description
          });
          this.setQuestions();
        });
    });
  }

  setQuestions() {
    const questions = this.questionnaireForm.get('questions') as FormArray;
    this.questionnaire.questions.forEach(question => {
      const options = question.options ? this.fb.array(
        question.options.map(option => {
          return this.fb.group({
            text: [option.text, Validators.required]
          });
        })
      ) : this.fb.array([]);
      questions.push(this.fb.group({
        text: [question.text, Validators.required],
        type: [question.type, Validators.required],
        options: options
      }));
    });
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

/*   deleteOption(questionIndex: number, optionIndex: number) {
    const question = this.questions.controls[questionIndex];
    const option = question.get('options')?.value[optionIndex];
    this.questionnaireService.deleteOption(this.questionnaireId, question.value._id, option._id)
      .subscribe(
        () => {
          this.getOptions(questionIndex).removeAt(optionIndex);
        },
        (error) => {
          console.error(error);
          // handle the error here
        }
      );
  } */
  deleteOption(questionIndex: number, optionIndex: number) {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  onSubmit() {
    const questionnaire = this.questionnaireForm.value;
    questionnaire._id = this.questionnaireId;
    this.questionnaireService.updateQuestionnaire(questionnaire)
      .subscribe(
        () => {
          this.router.navigate(['psy/questionnaire']);
        },
        (error) => {
          console.error(error);
          // handle the error here
        }
      );
  }
}