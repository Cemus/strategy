import { Component, Input } from '@angular/core';
import { Character } from '../../../core/models/character/character.model';

@Component({
  selector: 'app-character-avatar',
  imports: [],
  templateUrl: './character-avatar.component.html',
  styleUrl: './character-avatar.component.css',
})
export class CharacterAvatarComponent {
  @Input() character: Character | null = null;
}
