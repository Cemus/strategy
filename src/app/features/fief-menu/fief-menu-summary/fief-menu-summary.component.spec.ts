import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefMenuSummaryComponent } from './fief-menu-summary.component';

describe('FiefMenuSummaryComponent', () => {
  let component: FiefMenuSummaryComponent;
  let fixture: ComponentFixture<FiefMenuSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefMenuSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiefMenuSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
