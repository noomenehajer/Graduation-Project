import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPsyComponent } from './edit-psy.component';

describe('EditPsyComponent', () => {
  let component: EditPsyComponent;
  let fixture: ComponentFixture<EditPsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
