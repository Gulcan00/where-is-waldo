import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [TimerComponent, DropdownComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  img = viewChild<ElementRef>('img');
  showDropdown = signal<boolean>(false);

  onClick(event: MouseEvent) {
     const target = event.target as HTMLElement;
     if (!target) return;

     const rect = target.getBoundingClientRect();
     const posX = event.clientX - rect.left;
     const posY = event.clientY - rect.top;

     const xNormalized = posX / rect.width;
     const yNormalized = posY / rect.height; 

     this.showDropdown.set(!this.showDropdown());

     //TODO: show dropdown for character selection at (posX, posY)
     //TODO: send (xNormalized, yNormalized) to backend for character validation
     
  }
}
