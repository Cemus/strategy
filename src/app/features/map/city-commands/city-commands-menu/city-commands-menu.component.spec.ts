import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCommandsMenuComponent } from './city-commands-menu.component';

describe('CityCommandsComponent', () => {
  let component: CityCommandsMenuComponent;
  let fixture: ComponentFixture<CityCommandsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityCommandsMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityCommandsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
