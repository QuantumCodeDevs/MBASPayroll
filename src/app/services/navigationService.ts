//This service will handle any navigation messages sent from electron
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  constructor(private router: Router, private ngZone: NgZone) {
    //Check if the API is available
    if (window.electronAPI) {
      //Navigate using preload.js method
      window.electronAPI.onNavigate((route: string) => {
        this.ngZone.run(() => {
          this.router.navigate([route]);
        });
      });
    }
  }
}
