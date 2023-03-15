import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonValidStudentComponent } from './non-valid-student.component';

describe('NonValidStudentComponent', () => {
  let component: NonValidStudentComponent;
  let fixture: ComponentFixture<NonValidStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonValidStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonValidStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
