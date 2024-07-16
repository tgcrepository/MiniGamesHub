import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhaustAttemptComponent } from './exhaust-attempt.component';

describe('ExhaustAttemptComponent', () => {
  let component: ExhaustAttemptComponent;
  let fixture: ComponentFixture<ExhaustAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhaustAttemptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExhaustAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
