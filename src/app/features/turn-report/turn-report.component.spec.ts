import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnReportComponent } from './turn-report.component';

describe('TurnReportComponent', () => {
  let component: TurnReportComponent;
  let fixture: ComponentFixture<TurnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
