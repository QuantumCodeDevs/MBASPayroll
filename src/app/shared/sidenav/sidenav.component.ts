import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterOutlet, RouterLink, RouterModule, NgFor],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  constructor() {}

  menuItems = [
    { label: 'General Settings', path: '/settings' },
    { label: 'Clinician List', path: '/settings/clinicians' },
  ];

  ngOnInit() {
  }
}
