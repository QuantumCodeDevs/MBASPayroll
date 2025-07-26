// preload.js
const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  //Navigation
  onNavigate: (callback) => ipcRenderer.on('navigate', (_event, route) => callback(route)),
  //Select Folder
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  //Select File to Process
  selectFile: () => ipcRenderer.invoke('select-file'),
  //Save File
  saveFile: (fileName, content, filePath) => ipcRenderer.invoke('save-file', fileName, content, filePath ?? undefined),
  //Save Employees to DB
  saveEmployeesToDb: (employees) => ipcRenderer.invoke('save-employees', employees),
  //Get Employees from DB
  getEmployeesFromDb: () => ipcRenderer.invoke('load-employees'),

  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),

  loadSettings: () => ipcRenderer.invoke('load-settings'),
  
  // toggleDarkMode: () => ipcRenderer.invoke('dark-mode:toggle'), // Exposing the function
  // getTheme: () => ipcRenderer.invoke('get-theme'),
});