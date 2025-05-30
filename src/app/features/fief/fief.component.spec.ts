import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefComponent } from './fief.component';

describe('FiefComponent', () => {
  let component: FiefComponent;
  let fixture: ComponentFixture<FiefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
