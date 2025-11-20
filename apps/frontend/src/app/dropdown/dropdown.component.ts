import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  items = input.required<any[]>();
  value = input.required<string>();
  label = input.required<string>();
}
