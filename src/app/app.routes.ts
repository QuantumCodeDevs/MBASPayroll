import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { Component } from '@angular/core';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { ClinicianListComponent } from './pages/clinician-list/clinician-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirects root path to /home
    {path: 'home', component: HomeComponent},
    {path: 'settings', component: SidenavComponent, children: [
        {path: '', component: SettingsComponent},
        {path: 'clinicians', component: ClinicianListComponent}
    ]}
];
