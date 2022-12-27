import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachStravaComponent } from './attach-strava.component';

describe('AttachStravaComponent', () => {
  let component: AttachStravaComponent;
  let fixture: ComponentFixture<AttachStravaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachStravaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachStravaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
