import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  img = viewChild<ElementRef>('img');

  onClick(event: MouseEvent) {
    const posX = event.offsetX;
    const posY = event.offsetY;
    const imgWidth = this.img()?.nativeElement?.width;
    const imgHeight = this.img()?.nativeElement?.height;
    
    //const x = posX / img.width;
    //const y = posY / img.height;
    console.log({posX, posY});
    
    console.log('You clicked!');
    
  }
}
