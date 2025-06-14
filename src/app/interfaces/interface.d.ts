import { Clinician } from "../models/clinician";
import { InputFile } from "../models/inputFile"

export interface IElectronAPI {
  //Preload JS Exposed API Endpoints
  selectFile: () => Promise<InputFile>,
  saveFile: (fileName: string, content: string) => Promise<{ success: boolean; message: string }>,
  onNavigate: (string) => Promise<void>,
  saveEmployeesToDb: (employees: Clinician[]) => Promise<void>,
  getEmployeesFromDb: () => Promise<any[]>,

  // toggleDarkMode: () => Promise<boolean>
  // getTheme: () => Promise<string>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}