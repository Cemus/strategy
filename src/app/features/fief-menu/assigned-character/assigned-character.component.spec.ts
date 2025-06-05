import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCharacterComponent } from './assigned-character.component';

describe('AssignedCharacterComponent', () => {
  let component: AssignedCharacterComponent;
  let fixture: ComponentFixture<AssignedCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
