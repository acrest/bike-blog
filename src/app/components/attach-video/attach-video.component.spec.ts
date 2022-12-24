import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachVideoComponent } from './attach-video.component';

describe('AttachVideoComponent', () => {
  let component: AttachVideoComponent;
  let fixture: ComponentFixture<AttachVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
