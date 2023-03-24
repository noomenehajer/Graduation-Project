import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPsyComponent } from './login-psy.component';

describe('LoginPsyComponent', () => {
  let component: LoginPsyComponent;
  let fixture: ComponentFixture<LoginPsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
