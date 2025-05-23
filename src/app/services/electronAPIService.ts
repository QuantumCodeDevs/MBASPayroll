// Electron Service to access Electron APIs
import { Injectable } from '@angular/core';
import { InputFile } from '../models/InputFile';

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
    saveFile(fileName: string, content: string | undefined): Promise<{ success: boolean; message: string | undefined }> {
        return window.electronAPI.saveFile(fileName, content);
    }

    toggleDarkMode(): Promise<boolean> {
        return window.electronAPI.toggleDarkMode();
    }

    getTheme(): Promise<string> {
        return window.electronAPI.getTheme();
    }
    // Add more methods to access other Electron APIs
}