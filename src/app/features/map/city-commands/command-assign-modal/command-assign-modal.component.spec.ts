import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandAssignModal } from './command-assign-modal.component';

describe('CommandModalComponent', () => {
  let component: CommandAssignModal;
  let fixture: ComponentFixture<CommandAssignModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandAssignModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandAssignModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
