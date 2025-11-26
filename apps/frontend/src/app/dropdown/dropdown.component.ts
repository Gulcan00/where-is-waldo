import { Component, input, output } from '@angular/core';

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

  selectValue = output<any>();

  onSelectValue(value: any) {
    this.selectValue.emit(value);
  }
}
