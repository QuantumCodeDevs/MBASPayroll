import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '../app/services/navigationService';
import { ThemeService } from './services/themeService';
import { ToastComponent } from './shared/toast/toast.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //Inject the Navigation Service into the Main App Component
  constructor(private navigationService: NavigationService, private themeService: ThemeService) {}

  ngOnInit() {
    // Apply the theme globally on app initialization
    const isDark = this.themeService.isDarkMode();
    this.themeService.applyTheme(isDark);  // Apply the theme (dark or light) when app starts
  }
}
