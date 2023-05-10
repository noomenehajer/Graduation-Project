import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredQuestionnaireComponent } from './answered-questionnaire.component';

describe('AnsweredQuestionnaireComponent', () => {
  let component: AnsweredQuestionnaireComponent;
  let fixture: ComponentFixture<AnsweredQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsweredQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweredQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
