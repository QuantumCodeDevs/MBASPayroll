import { Employee } from "../models/employee";
import { InputFile } from "../models/InputFile"

export interface IElectronAPI {
    selectFile: () => Promise<InputFile>,
    saveFile: (fileName:string, content:string) => Promise<{ success: boolean; message: string }>,
    onNavigate: (string) => Promise<void>,
    saveEmployeesToDb: (employees: Employee[]) => Promise<void>,
    getEmployeesFromDb: () => Promise<any[]>,

    toggleDarkMode: () => Promise<boolean>
    getTheme: () => Promise<string>,

  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI
    }
  }