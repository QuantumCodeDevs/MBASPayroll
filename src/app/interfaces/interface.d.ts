import { Clinician } from "../models/clinician";
import { InputFile } from "../models/inputFile"
import { Settings } from "../models/settings";

export interface IElectronAPI {
  //Preload JS Exposed API Endpoints
  selectFolder: () => Promise<{ success: boolean; folderPath: string, message: string }>,
  selectFile: () => Promise<InputFile>,
  saveFile: (fileName: string, content: string) => Promise<{ success: boolean; message: string }>,
  onNavigate: (string) => Promise<void>,
  saveEmployeesToDb: (employees: Clinician[]) => Promise<void>,
  getEmployeesFromDb: () => Promise<any[]>,

  saveSettings: (settings: any[]) => Promise<void>,
  loadSettings: () => Promise<any[]>,

  // toggleDarkMode: () => Promise<boolean>
  // getTheme: () => Promise<string>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}