import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false); // Angular Signal for reactivity

  //Change to Electron Store
  constructor() {
    // Load dark mode state from local storage
    const savedMode = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode.set(savedMode);
    this.applyTheme(savedMode); // Apply on initialization
  }

  // Toggle dark mode
  toggleDarkMode() {
    const newMode = !this.isDarkMode();
    this.isDarkMode.set(newMode);
    localStorage.setItem('darkMode', String(newMode)); // Save to local storage
    this.applyTheme(newMode); // Apply mode change
  }

  // Apply dark mode and Bootstrap classes to body
  // Apply dark mode, Bootstrap classes, and text color to body
  applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark-mode', isDark);

    // document.querySelectorAll('nav, app-home').forEach(element => {
    //   element.classList.toggle('dark-mode', isDark);
    // });    
  }
}
