import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPsychologueComponent } from './detail-psychologue.component';

describe('DetailPsychologueComponent', () => {
  let component: DetailPsychologueComponent;
  let fixture: ComponentFixture<DetailPsychologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPsychologueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPsychologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
