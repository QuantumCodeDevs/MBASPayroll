import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage } from '../models/toastmessage';

@Injectable({ 
  providedIn: 'root' 
})

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