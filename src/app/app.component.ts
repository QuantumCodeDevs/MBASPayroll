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
  //Inject services
  constructor(private navigationService: NavigationService, private themeService: ThemeService) {}

  ngOnInit() {
  }
}
