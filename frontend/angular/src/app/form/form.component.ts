import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { Form } from '../models/form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: Form = {
    title: '',
    questions: []
  };

  constructor(private formService: FormService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formService.createForm(this.form)
      .subscribe(
        form => console.log('Form created:', form),
        error => console.error('Error creating form:', error)
      );
  }

}
