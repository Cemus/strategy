import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Command } from '../build-commands/build-commands.component';
import { AvailableCharactersComponent } from '../../../fief-menu/available-characters/available-characters.component';
import { Character } from '../../../../core/models/character/character.model';

@Component({
  selector: 'app-command-modal',
  imports: [AvailableCharactersComponent],
  templateUrl: './command-modal.component.html',
  styleUrl: './command-modal.component.css',
})
export class CommandModalComponent implements OnInit {
  @Input() cmd?: Command;
  @Input() characters: Character[] = [];

  @Output() closeCommandModal = new EventEmitter<void>();
  protected currentStat: number = 0;

  ngOnInit(): void {
    console.log(this.cmd);
  }

  areRequirementsFullfilled() {
    if (this.cmd?.requirement) {
      return this.currentStat >= this.cmd.requirement;
    }
    return false;
  }

  emitCloseCommandModal() {
    this.closeCommandModal.emit();
  }

  onAssignCharacterToMission(character: Character) {}
}
