import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionnaireComponent } from './list-questionnaire.component';

describe('ListQuestionnaireComponent', () => {
  let component: ListQuestionnaireComponent;
  let fixture: ComponentFixture<ListQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
