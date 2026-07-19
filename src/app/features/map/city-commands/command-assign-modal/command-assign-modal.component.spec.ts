import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandAssignModalComponent } from './command-assign-modal.component';

describe('CommandAssignModalComponent', () => {
  let component: CommandAssignModalComponent;
  let fixture: ComponentFixture<CommandAssignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandAssignModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandAssignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
