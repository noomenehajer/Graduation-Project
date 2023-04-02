import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsyLayoutComponent } from './psy-layout.component';

describe('PsyLayoutComponent', () => {
  let component: PsyLayoutComponent;
  let fixture: ComponentFixture<PsyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsyLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
