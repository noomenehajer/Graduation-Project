import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArticleStComponent } from './detail-article-st.component';

describe('DetailArticleStComponent', () => {
  let component: DetailArticleStComponent;
  let fixture: ComponentFixture<DetailArticleStComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailArticleStComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailArticleStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
