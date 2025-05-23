// Electron Service to access Electron APIs
import { Injectable } from '@angular/core';
import { InputFile } from '../models/inputFile';

@Injectable({
    providedIn: 'root',
})
export class ElectronAPIService {

    constructor() { }
    //Select File Method
    selectFile(): Promise<InputFile> {
        return window.electronAPI.selectFile();
    }

    //Save to desktop
    saveFile(fileName: string, content: string): Promise<{ success: boolean; message: string }> {
        return window.electronAPI.saveFile(fileName, content);
    }


    // //TEST Methods
    // getVersion(): Promise<string> {
    //     return window.electronAPI.getVersion();
    // }

    // getOS(): Promise<string> {
    //     return window.electronAPI.getOS();
    // }


    toggleDarkMode(): Promise<boolean> {
        return window.electronAPI.toggleDarkMode();
    }

    getTheme(): Promise<string> {
        return window.electronAPI.getTheme();
    }
    // Add more methods to access other Electron APIs
}