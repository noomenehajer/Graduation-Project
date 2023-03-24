import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailQuestionnaireComponent } from './detail-questionnaire.component';

describe('DetailQuestionnaireComponent', () => {
  let component: DetailQuestionnaireComponent;
  let fixture: ComponentFixture<DetailQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
