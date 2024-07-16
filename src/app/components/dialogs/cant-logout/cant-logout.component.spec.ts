import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantLogoutComponent } from './cant-logout.component';

describe('CantLogoutComponent', () => {
  let component: CantLogoutComponent;
  let fixture: ComponentFixture<CantLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantLogoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CantLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
