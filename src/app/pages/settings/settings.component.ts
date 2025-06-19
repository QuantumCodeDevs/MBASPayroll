import { Component, computed } from '@angular/core';
import { ThemeService } from '../../services/themeService';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(public themeService: ThemeService) {} // Inject ThemeService

  isDarkMode = computed(() => this.themeService.isDarkMode()); // Reactive from the theme service to know which theme is on

  //Handles toggling from light and dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  //Add more settings below
}
