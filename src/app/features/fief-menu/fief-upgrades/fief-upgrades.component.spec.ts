import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefUpgradesComponent } from './fief-upgrades.component';

describe('FiefUpgradesComponent', () => {
  let component: FiefUpgradesComponent;
  let fixture: ComponentFixture<FiefUpgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefUpgradesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiefUpgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
