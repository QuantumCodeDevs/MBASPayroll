// Electron Service to access Electron APIs
import { Injectable } from '@angular/core';
import { InputFile } from '../models/InputFile';
import { Employee } from '../models/employee';

//Injectable decorator allows this service to be injected into components or other services
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
    saveFile(fileName: string, content: string): Promise<{ success: boolean; message: string | undefined }> {
        return window.electronAPI.saveFile(fileName, content);
    }

    //Save Employees to Database
    saveEmployeesToDb(employees: Employee[]): Promise<void> {
        return window.electronAPI.saveEmployeesToDb(employees);
    }

    //Get Employees from Database
    getEmployeesFromDb(): Promise<any[]> {
        return window.electronAPI.getEmployeesFromDb();
    }




    
    toggleDarkMode(): Promise<boolean> {
        return window.electronAPI.toggleDarkMode();
    }

    getTheme(): Promise<string> {
        return window.electronAPI.getTheme();
    }

    // Add more methods to access other Electron APIs
}