import { InputFile } from "../models/InputFile"

export interface IElectronAPI {
    selectFile: () => Promise<InputFile>,
    saveFile: (fileName:string, content:string | undefined) => Promise<{ success: boolean; message: string }>,
    onNavigate: (string) => Promise<void>,
    toggleDarkMode: () => Promise<boolean>
    getTheme: () => Promise<string>,

  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI
    }
  }