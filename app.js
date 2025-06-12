// main.js
const { app, BrowserWindow, session, Menu, ipcMain, dialog, protocol, nativeTheme } = require('electron');
const { join } = require('path');
const { FileProcessor } = require('./src/js/fileProcessor');
//Store for saving data
let store;

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: false, // Disable web security for local development issue with prod currently
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile(join(__dirname, 'dist', 'mbas-payroll', 'browser', 'index.html'));

    //TODO: Update this to have a complete menu
    //Handle Menu Creation
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: "Home",
                    accelerator: process.platform === 'darwin' ? 'Command+H' : 'Ctrl+H',
                    click: () => mainWindow.webContents.send('navigate', '/')
                },
                {
                    label: 'Settings',
                    accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
                    click: () => mainWindow.webContents.send('navigate', '/settings')
                },
                {
                    label: 'Quit',
                    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: process.platform === 'darwin' ? 'Command+R' : 'Ctrl+R',
                    click: () => {
                        const focusedWindow = BrowserWindow.getFocusedWindow();
                        if (focusedWindow) {
                            focusedWindow.reload();
                        }
                    }
                },
                {
                    label: 'Force Reload',
                    accelerator: process.platform === 'darwin' ? 'Command+Shift+R' : 'Ctrl+Shift+R',
                    click: () => {
                        const focusedWindow = BrowserWindow.getFocusedWindow();
                        if (focusedWindow) {
                            focusedWindow.webContents.reloadIgnoringCache();
                        }
                    }
                },
                {
                    label: 'Toggle Debug Tools',
                    accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                    click: () => {
                        const focusedWindow = BrowserWindow.getFocusedWindow();
                        if (focusedWindow) {
                            focusedWindow.webContents.toggleDevTools();
                        }
                    }
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                // {
                //     label: 'Documentation',
                //     //Open the documentation URL in a external browser
                //     click: () => {
                //         require('electron').shell.openExternal('https://google.com');
                //     }
                // },
                {
                    label: 'About',
                    click: () => {
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'About MBAS Payroll',
                            message: `MBAS Payroll Application\nVersion ${app.getVersion()}\nDeveloped by Kenneth Lamb`,
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ])

    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.enableSandbox()
app.whenReady().then(async () => {
    // Dynamically import electron-store
    const Store = (await import('electron-store')).default;
    store = new Store();

    //Set CORS Policy
    // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    //     callback({
    //         responseHeaders: Object.assign({
    //             "Content-Security-Policy": ["default-src 'self' 'unsafe-inline';"]
    //         }, details.responseHeaders)
    //     });
    // });

    //DEBUG: Uncomment to clear cache
    // try {
    //     await session.clearCache();
    //     console.log("Electron cache cleared.");
    // } catch (err) {
    //     console.error("Error clearing cache:", err);
    // }

    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

//API Calls to use in preload.js//

//#region File Selection and Saving//
//Handle Selecting a CSV File
ipcMain.handle('select-file', async () => {
    //Open File Dialog
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'CSV Files', extensions: ['csv'] },
            // { name: 'Excel Files', extensions: ['xlsx'] }
        ]
    });

    const { canceled, filePaths } = result;

    if (canceled) {
        return { Success: false, FileName: '', Data: '', Message: "No file selected" };
    }

    try {
        const clinicians = await FileProcessor.readAndParse(filePaths[0])
        // console.log(clinicians);

        return { Success: true, FileName: filePaths[0], Data: JSON.stringify(clinicians), Message: 'Successfully read file' };
    } catch (err) {
        return { Success: false, FileName: '', Data: '', Message: `Error reading CSV file: ${err.message}` };
    }
})

// Handle Saving a CSV file
ipcMain.handle('save-file', async (event, fileName, data) => {
    const result = await dialog.showSaveDialog({
        defaultPath: join(app.getPath('documents'), fileName || 'output.csv'),
        filters: [{ name: 'CSV Files', extensions: ['csv'] }]
    });

    if (result.canceled || !result.filePath) {
        return { success: false, message: 'Save cancelled.' };
    }

    try {
        FileProcessor.writeFile(result.filePath, data);

        return { success: true, message: `File saved at ${result.filePath}` };
    } catch (err) {
        return { success: false, message: `Error saving CSV file: ${err.message}` };
    }
});
//#endregion

//#region Handle Employee list storage
// Save employees
ipcMain.handle('save-employees', async (event, employees) => {
    store.set('employees', employees);
    return { success: true };
});

// Load employees
ipcMain.handle('load-employees', async () => {
    return store.get('employees', []);
});
//#endregion