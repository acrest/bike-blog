import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeBuilderComponent } from './bike-builder.component';

describe('BikeBuilderComponent', () => {
  let component: BikeBuilderComponent;
  let fixture: ComponentFixture<BikeBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
