import { Component } from '@angular/core';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  constructor(
    public timerService: TimerService
  ) { }

  ngOnInit() {
    this.timerService.startTimer();
  }
}
