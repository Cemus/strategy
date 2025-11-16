import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefIconComponent } from './fief-icon.component';

describe('FiefIconComponent', () => {
  let component: FiefIconComponent;
  let fixture: ComponentFixture<FiefIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiefIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
