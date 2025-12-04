import { computed, Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService implements OnDestroy {
  private time = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  isRunning = signal(false);
  formattedTime = computed(() => {
    const totalSeconds = this.time();
    return this.formatTime(totalSeconds);
  });
    

  constructor() { }

  startTimer() {
    if (this.isRunning()) return;

    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      this.time.set(this.time() + 1);
    }, 1000);
  }

  stopTimer() {
    this.time.set(0);
    this.isRunning.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  formatTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
