import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '../app/services/navigationService';
import { ThemeService } from './services/themeService';
import { ToastComponent } from './shared/toast/toast.component';
import { SettingsService } from './services/settingsService';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //Inject services
  constructor(private navigationService: NavigationService, private settingsService: SettingsService, private themeService: ThemeService) {}

  async ngOnInit() {
    /*For some reason we need to load any services that are to be used site wide load in the app.component.ts first*/
    //Load the settings first
    await this.settingsService.loadSettings();
    //Load the theme second
    await this.themeService.loadTheme();
  }
}
