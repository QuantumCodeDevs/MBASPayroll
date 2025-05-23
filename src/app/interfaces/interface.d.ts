import { InputFile } from "../models/inputFile"

export interface IElectronAPI {
    selectFile: () => Promise<InputFile>,
    saveFile: (fileName:string, content:string) => Promise<{ success: boolean; message: string }>,
    onNavigate: (string) => Promise<void>,
    toggleDarkMode: () => Promise<boolean>
    getTheme: () => Promise<string>,

    
    // getVersion: () => Promise<string>,
    // getOS: () => Promise<string>,
  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI
    }
  }