import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildCommandsComponent } from './build-commands.component';

describe('BuildCommandsComponent', () => {
  let component: BuildCommandsComponent;
  let fixture: ComponentFixture<BuildCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildCommandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
