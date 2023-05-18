import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvConfirmeeComponent } from './rv-confirmee.component';

describe('RvConfirmeeComponent', () => {
  let component: RvConfirmeeComponent;
  let fixture: ComponentFixture<RvConfirmeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RvConfirmeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RvConfirmeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
