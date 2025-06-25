import { Injectable, signal } from '@angular/core';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false); // Angular Signal for reactivity

  //Change to Electron Store?
  constructor() {}

  ngOnInit() {}

  async loadTheme() {
    this.isDarkMode.set(Settings.DarkMode);
    this.applyTheme(Settings.DarkMode); // Apply on initialization works as long as it is injected in some component
  }

  // Toggle dark mode
  async toggleDarkMode() {
    Settings.DarkMode = !this.isDarkMode();
    this.isDarkMode.set(Settings.DarkMode);
    this.applyTheme(Settings.DarkMode); // Apply mode change
  }

  // Apply dark mode and Bootstrap classes to body
  // Apply dark mode, Bootstrap classes, and text color to body
  private applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark-mode', isDark);  
  }
}
