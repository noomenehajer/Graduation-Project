import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubishQuestionnaireComponent } from './publish-questionnaire.component';

describe('PubishQuestionnaireComponent', () => {
  let component: PubishQuestionnaireComponent;
  let fixture: ComponentFixture<PubishQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubishQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubishQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
