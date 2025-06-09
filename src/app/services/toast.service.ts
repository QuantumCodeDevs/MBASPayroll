import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toast$ = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this._toast$.asObservable();

  show(message: ToastMessage) {
    this._toast$.next(message);
    setTimeout(() => this.clear(), message.duration ?? 3000);
  }

  clear() {
    this._toast$.next(null);
  }
}