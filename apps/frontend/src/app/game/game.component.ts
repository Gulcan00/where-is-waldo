import { Component, computed, ElementRef, OnInit, signal, Signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TimerComponent } from '../timer/timer.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Character } from '../models/character';
import { ApiService } from '../services/api.service';

interface CharacterUI extends Character {
  found: boolean;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [TimerComponent, DropdownComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  img = viewChild<ElementRef>('img');
  dropdownState = signal<{x: number, y: number, visible: boolean}>({x: 0, y: 0, visible: false});

  private xNormalized: number = 0;
  private yNormalized: number = 0;

  readonly characters = toSignal(
    this.api.getCharacters(), 
    { initialValue: []}
  );

  foundIds = signal<number[]>([]);

  displayCharacters = computed<CharacterUI[]>(() => {
    const allCharacters = this.characters();
    return allCharacters.map(character => ({
      ...character,
      found: this.foundIds().includes(character.id)
    }));
  });

  constructor(private api: ApiService) {}

  onClick(event: MouseEvent) {
     const target = event.target as HTMLElement;
     if (!target) return;

     const rect = target.getBoundingClientRect();
     const posX = event.clientX - rect.left;
     const posY = event.clientY - rect.top;

     this.xNormalized = posX / rect.width;
     this.yNormalized = posY / rect.height; 
     
     this.dropdownState.set({x: event.clientX, y: event.clientY, visible: !this.dropdownState().visible});
  }

  onSelectValue(characterId: number) {
    this.dropdownState.update(val => ({...val, visible: !val.visible}));
    this.api.validate({
      positionX: this.xNormalized,
      positionY: this.yNormalized,
      characterId
    }).subscribe({
      next: (result) => {
          if (result) {
            this.foundIds.update(currentIds => [...currentIds, characterId]);
          }         
      }
    })
  }
}
