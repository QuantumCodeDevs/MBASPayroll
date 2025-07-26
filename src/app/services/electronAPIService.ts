// Electron Service to access Electron APIs
import { Injectable } from '@angular/core';
import { InputFile } from '../models/inputFile';
import { Clinician } from '../models/clinician';
import { Settings } from '../models/settings';

//Injectable decorator allows this service to be injected into components or other services
@Injectable({
    providedIn: 'root',
})
export class ElectronAPIService {

    constructor() { }
    //Select Folder
    selectFolder(): Promise<{ success: boolean; folderPath: string, message: string }> {
        return window.electronAPI.selectFolder();
    }

    //Select File Method
    selectFile(): Promise<InputFile> {
        return window.electronAPI.selectFile();
    }

    //Save to desktop
    saveFile(fileName: string, content: string, filePath?: string): Promise<{ success: boolean; message: string | undefined }> {
        return window.electronAPI.saveFile(fileName, content, filePath);
    }

    //Save Employees to Database
    saveEmployeesToDb(employees: Clinician[]): Promise<void> {
        return window.electronAPI.saveEmployeesToDb(employees);
    }

    //Get Employees from Database
    getEmployeesFromDb(): Promise<any[]> {
        return window.electronAPI.getEmployeesFromDb();
    }

    saveSettings(settings: any[]): Promise<void> {
        return window.electronAPI.saveSettings(settings);
    }

    loadSettings(): Promise<any[]> {
        return window.electronAPI.loadSettings();
    }

    // Add more methods to access other Electron APIs
    // toggleDarkMode(): Promise<boolean> {
    //     return window.electronAPI.toggleDarkMode();
    // }

    // getTheme(): Promise<string> {
    //     return window.electronAPI.getTheme();
    // }
}