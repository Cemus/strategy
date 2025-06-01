import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityFieftMenuComponent } from './city-fief-menu.component';

describe('CityDistrictMenuComponent', () => {
  let component: CityFieftMenuComponent;
  let fixture: ComponentFixture<CityFieftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityFieftMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityFieftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
