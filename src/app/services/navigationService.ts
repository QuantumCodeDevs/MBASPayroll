//This service will handle any navigation messages sent from electron
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {
    //Check if the API is available
    if (window.electronAPI) {
      //Navigate using preload.js method
      window.electronAPI.onNavigate((route: string) => {
        //Set route
        this.router.navigate([route]);
      });
    }
  }
}
