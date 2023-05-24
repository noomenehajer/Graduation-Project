import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRvComponent } from './list-rv.component';

describe('ListRvComponent', () => {
  let component: ListRvComponent;
  let fixture: ComponentFixture<ListRvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
