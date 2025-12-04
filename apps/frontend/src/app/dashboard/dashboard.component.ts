import { Component, Signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ApiService } from '../services/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Score } from '../models/score';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  scenes = ['scene1', 'scene2', 'scene3'];

  scores: Signal<Score[]> = toSignal(this.api.getScores());

  constructor (
    private api: ApiService,
    public timer: TimerService
  ) {}


}
