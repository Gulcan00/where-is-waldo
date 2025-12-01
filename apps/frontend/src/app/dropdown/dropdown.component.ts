import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent<T> {
  items = input.required<any[]>();
  getValue = input.required<(item: T) => any>();
  getLabel = input.required<(item: T) => string>();
  shouldDisplay = input<(item: T) => boolean>();
  imgUrl = input<string>();

  selectValue = output<any>();

  onSelectValue(value: any) {
    this.selectValue.emit(value);
  }
}
