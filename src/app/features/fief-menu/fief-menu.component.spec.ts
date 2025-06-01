import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiefMenuComponent } from './fief-menu.component';

describe('FiefMenuComponent', () => {
  let component: FiefMenuComponent;
  let fixture: ComponentFixture<FiefMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiefMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiefMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
