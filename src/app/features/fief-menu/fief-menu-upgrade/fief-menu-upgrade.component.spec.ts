import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefMenuUpgradeComponent } from './fief-menu-upgrade.component';

describe('FiefMenuUpgradeComponent', () => {
  let component: FiefMenuUpgradeComponent;
  let fixture: ComponentFixture<FiefMenuUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefMenuUpgradeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiefMenuUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
