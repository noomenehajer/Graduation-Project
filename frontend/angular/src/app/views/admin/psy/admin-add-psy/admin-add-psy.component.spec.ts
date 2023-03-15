import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPsyComponent } from './admin-add-psy.component';

describe('AdminAddPsyComponent', () => {
  let component: AdminAddPsyComponent;
  let fixture: ComponentFixture<AdminAddPsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddPsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddPsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
