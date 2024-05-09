import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = 1000;

export const TIMER_STATE = new InjectionToken<number>('TimerState', {
  factory: () => DEFAULT_TIMER,
});
