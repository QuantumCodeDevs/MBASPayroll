// preload.js
const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  //Navigation
  onNavigate: (callback) => ipcRenderer.on('navigate', (_event, route) => callback(route)),
  //Select File to Process
  selectFile: () => ipcRenderer.invoke('select-file'),
  //Save File
  saveFile: (fileName, content) => ipcRenderer.invoke('save-file', fileName, content),

  // toggleDarkMode: () => ipcRenderer.invoke('dark-mode:toggle'), // Exposing the function
  // getTheme: () => ipcRenderer.invoke('get-theme'),

});