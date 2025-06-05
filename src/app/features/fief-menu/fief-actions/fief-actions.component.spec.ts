import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefActionsComponent } from './fief-actions.component';

describe('FiefActionsComponent', () => {
  let component: FiefActionsComponent;
  let fixture: ComponentFixture<FiefActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiefActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
