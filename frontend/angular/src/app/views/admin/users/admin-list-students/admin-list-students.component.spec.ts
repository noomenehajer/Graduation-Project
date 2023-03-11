import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListStudentsComponent } from './admin-list-students.component';

describe('AdminListStudentsComponent', () => {
  let component: AdminListStudentsComponent;
  let fixture: ComponentFixture<AdminListStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
