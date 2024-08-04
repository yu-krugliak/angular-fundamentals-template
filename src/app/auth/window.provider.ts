import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window');

export function windowFactory(): Window {
  return window;
}

export const WINDOW_PROVIDERS = [
  { provide: WINDOW, useFactory: windowFactory }
];