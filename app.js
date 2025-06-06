// main.js
const { app, BrowserWindow, session, Menu, ipcMain, dialog, nativeTheme, OpenDialogReturnValue } = require('electron');
const fs = require('fs');
const url = require("url");
const path = require("path");
const os = require("os");
const { parseCsvFile } = require('./src/js/parsers/csvParser');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'dist', 'mbas-payroll', 'browser', 'index.html'));

    // mainWindow.loadURL(
    //     url.format({
    //         pathname: path.join(__dirname, `/dist/mbas-payroll/browser/index.html`),
    //         protocol: "file:",
    //         slashes: true
    //     })
    // )

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    //TODO: Update this to have a complete menu
    //Handle Menu Creation
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: "Home",
                    click: () => mainWindow.webContents.send('navigate', '/')
                },
                {
                    label: 'Settings',
                    click: () => mainWindow.webContents.send('navigate', '/settings')
                },
                {
                    label: 'Exit',
                    click: () => app.quit(),
                    //sublabel: 'Ctrl+Q'
                }
            ]
        },
        {
            label: 'View'
        }
    ])

    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.enableSandbox()
app.whenReady().then(async () => {
    try {
        await ses.clearCache();
        console.log("Electron cache cleared.");
    } catch (err) {
        console.error("Error clearing cache:", err);
    }

    //Set CORS Policy
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: Object.assign({
                "Content-Security-Policy": ["default-src 'self' 'unsafe-inline';"]
            }, details.responseHeaders)
        });
    });

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


// Custom API Calls

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

    // Parse the CSV file and return its data into custom object
    try {
        // const data = fs.readFileSync(filePaths[0]);
        const clinicians = await parseCsvFile(filePaths[0])

        return { Success: true, FileName: filePaths[0], Data: JSON.stringify(clinicians), Message: 'Successfully read file' };
    } catch (err) {
        return { Success: false, FileName: '', Data: '', Message: `Error reading CSV file: ${err.message}` };
    }
})

// Handle Saving a CSV file
ipcMain.handle('save-file', async (event, fileName, data) => {
    const result = await dialog.showSaveDialog({
        defaultPath: path.join(app.getPath('documents'), fileName || 'output.csv'),
        filters: [{ name: 'CSV Files ore Text Files', extensions: ['csv', 'txt'] }]
    });

    if (result.canceled || !result.filePath) {
        return { success: false, message: 'Save cancelled.' };
    }

    try {
        console.log("write file to:", result.filePath);
        console.log(fileName);
        console.log(data);

        fs.writeFileSync(result.filePath, data);
        return { success: true, message: `File saved at ${result.filePath}` };
    } catch (err) {
        return { success: false, message: `Error saving CSV file: ${err.message}` };
    }
});
