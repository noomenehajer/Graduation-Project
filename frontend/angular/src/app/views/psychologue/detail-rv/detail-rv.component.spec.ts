import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRVComponent } from './detail-rv.component';

describe('DetailRVComponent', () => {
  let component: DetailRVComponent;
  let fixture: ComponentFixture<DetailRVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
