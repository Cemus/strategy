import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefMenuNavComponent } from './fief-menu-nav.component';

describe('FiefMenuNavComponent', () => {
  let component: FiefMenuNavComponent;
  let fixture: ComponentFixture<FiefMenuNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefMenuNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiefMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
