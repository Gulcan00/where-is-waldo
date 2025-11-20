import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Character } from '../models/character';

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

  characters: Character[] = [
    {
        id: 1,
        name: 'Waldo',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Waldo_concept_art.jpg'
    },
    {
        id: 2,
        name: 'Odlaw',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Odlaw.jpg'
    },
    {
        id: 3,
        name: 'Wenda',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Wenda_concept_art.jpg'
    }
  ];

  onClick(event: MouseEvent) {
     const target = event.target as HTMLElement;
     if (!target) return;

     const rect = target.getBoundingClientRect();
     const posX = event.clientX - rect.left;
     const posY = event.clientY - rect.top;

     const xNormalized = posX / rect.width;
     const yNormalized = posY / rect.height; 

     this.dropdownState.set({x: event.clientX, y: event.clientY, visible: !this.dropdownState().visible});

     //TODO: show dropdown for character selection at (posX, posY)
     //TODO: send (xNormalized, yNormalized) to backend for character validation
     
  }
}
