import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCommandsComponent } from './city-commands.component';

describe('CityCommandsComponent', () => {
  let component: CityCommandsComponent;
  let fixture: ComponentFixture<CityCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityCommandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
