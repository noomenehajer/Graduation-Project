import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandezRvComponent } from './demandez-rv.component';

describe('DemandezRvComponent', () => {
  let component: DemandezRvComponent;
  let fixture: ComponentFixture<DemandezRvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandezRvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandezRvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
