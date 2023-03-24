import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPsyComponent } from './signup-psy.component';

describe('SignupPsyComponent', () => {
  let component: SignupPsyComponent;
  let fixture: ComponentFixture<SignupPsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupPsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
