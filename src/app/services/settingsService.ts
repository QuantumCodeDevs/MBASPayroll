import { Injectable } from '@angular/core';
import { ElectronAPIService } from './electronAPIService';
import { Settings } from '../models/settings';

//Injectable decorator allows this service to be injected into components or other services
@Injectable({
    providedIn: 'root',
})

export class SettingsService {

    constructor(private electronAPIService: ElectronAPIService) {}

    ngOnInit() {}

    /** Loads settings from an array and assigns them to the Settings class */
    async loadSettings() {
        const loadedArray = await this.electronAPIService.loadSettings();
        if (Array.isArray(loadedArray)) {
            loadedArray.forEach((item: { key: string, value: any }) => {
                if (typeof (Settings as any)[item.key] !== 'function') {
                    (Settings as any)[item.key] = item.value;
                    console.log(`Loaded setting: ${item.key} = ${item.value}`);
                    console.log(Settings.DarkMode);
                }
            });
        }
    }

    /** Saves static properties of Settings as an array of { key, value } */
    async saveSettings() {
        const toSave = staticClassToArray(Settings);
        await this.electronAPIService.saveSettings(toSave);
    }
}

function staticClassToArray(cls: any): { key: string, value: any }[] {
    return Object.keys(cls)
        .filter(key => typeof cls[key] !== 'function')
        .map(key => ({ key, value: cls[key] }));
}