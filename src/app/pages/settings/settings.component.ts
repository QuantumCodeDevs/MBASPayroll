import { Component, computed } from '@angular/core';
import { ThemeService } from '../../services/themeService';
import { SettingsService } from '../../services/settingsService';
import { Settings } from '../../models/settings';
import { ElectronAPIService } from '../../services/electronAPIService';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  outputDir?:string;

  constructor(private electronAPIService: ElectronAPIService, private themeService: ThemeService, private settingsService: SettingsService) {} // Inject ThemeService

  ngOnInit() {
    this.outputDir = Settings.OutputFolder;
  }

  isDarkMode = computed(() => this.themeService.isDarkMode()); // Reactive from the theme service to know which theme is on

  //Handles toggling from light and dark mode
  async toggleDarkMode() {
    await this.themeService.toggleDarkMode();
    await this.settingsService.saveSettings();
  }

  async selectOutputDir() {
    const folder = await this.electronAPIService.selectFolder();
    this.outputDir = folder.folderPath;
    Settings.OutputFolder = this.outputDir;
    await this.settingsService.saveSettings();
  }
  //Add more settings below
}
