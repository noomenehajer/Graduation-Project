import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPsychologuesComponent } from './list-psychologues.component';

describe('ListPsychologuesComponent', () => {
  let component: ListPsychologuesComponent;
  let fixture: ComponentFixture<ListPsychologuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPsychologuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPsychologuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
