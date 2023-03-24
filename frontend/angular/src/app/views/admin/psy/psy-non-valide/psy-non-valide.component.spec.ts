import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsyNonValideComponent } from './psy-non-valide.component';

describe('PsyNonValideComponent', () => {
  let component: PsyNonValideComponent;
  let fixture: ComponentFixture<PsyNonValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsyNonValideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsyNonValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
