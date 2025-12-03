import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-name-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player-name-modal.component.html',
  styleUrl: './player-name-modal.component.css'
})
export class PlayerNameModalComponent {
  show = input<boolean>();
  submit = output<string>(); 
  playerName = '';

  onSubmit() {
    this.submit.emit(this.playerName);
  }
}
