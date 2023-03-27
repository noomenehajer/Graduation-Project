import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesStComponent } from './list-articles-st.component';

describe('ListArticlesStComponent', () => {
  let component: ListArticlesStComponent;
  let fixture: ComponentFixture<ListArticlesStComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArticlesStComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArticlesStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
