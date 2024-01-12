import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCheckerComponent } from './component-checker.component';

describe('ComponentCheckerComponent', () => {
  let component: ComponentCheckerComponent;
  let fixture: ComponentFixture<ComponentCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
