import { Component, ElementRef, viewChild } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  img = viewChild<ElementRef>('img');

  onClick(event: MouseEvent) {
     const target = event.target as HTMLElement;
     if (!target) return;

     const rect = target.getBoundingClientRect();
     const posX = event.clientX - rect.left;
     const posY = event.clientY - rect.top;

     const xNormalized = posX / rect.width;
     const yNormalized = posY / rect.height; 

     //TODO: show dropdown for character selection at (posX, posY)
     //TODO: send (xNormalized, yNormalized) to backend for character validation
     
  }
}
