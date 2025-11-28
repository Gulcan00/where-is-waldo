import { Component, input } from '@angular/core';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  name = input<string>();
  found = input<boolean>();
  imgUrl = input<string>();
}
