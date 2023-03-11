import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListPsyComponent } from './admin-list-psy.component';

describe('AdminListPsyComponent', () => {
  let component: AdminListPsyComponent;
  let fixture: ComponentFixture<AdminListPsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListPsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListPsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
