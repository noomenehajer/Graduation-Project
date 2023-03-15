import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPsyComponent } from './detail-psy.component';

describe('DetailPsyComponent', () => {
  let component: DetailPsyComponent;
  let fixture: ComponentFixture<DetailPsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
