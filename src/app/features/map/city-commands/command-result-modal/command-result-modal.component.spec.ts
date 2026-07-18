import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandResultModalComponent } from './command-result-modal.component';

describe('CommandResultModalComponent', () => {
  let component: CommandResultModalComponent;
  let fixture: ComponentFixture<CommandResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandResultModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
