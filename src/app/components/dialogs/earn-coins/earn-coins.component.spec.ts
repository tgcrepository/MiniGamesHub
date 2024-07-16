import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnCoinsComponent } from './earn-coins.component';

describe('EarnCoinsComponent', () => {
  let component: EarnCoinsComponent;
  let fixture: ComponentFixture<EarnCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarnCoinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarnCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
