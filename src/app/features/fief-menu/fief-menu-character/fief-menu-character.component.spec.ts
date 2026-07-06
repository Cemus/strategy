import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefMenuCharacterComponent } from './fief-menu-character.component';

describe('FiefMenuCharacterComponent', () => {
  let component: FiefMenuCharacterComponent;
  let fixture: ComponentFixture<FiefMenuCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefMenuCharacterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiefMenuCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
