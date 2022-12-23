import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPhotoComponent } from './blog-photo.component';

describe('BlogPhotoComponent', () => {
  let component: BlogPhotoComponent;
  let fixture: ComponentFixture<BlogPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
