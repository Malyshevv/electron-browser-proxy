// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

const PROXY_CONFIG = {
    type: 'socks5',
    host: '159.65.232.22', //http://free-proxy.cz/ru/
    port: 10774,
    //proxyAuth: 'u7pwoh18'
};


const PROXY_RULES = {
    proxyRules: PROXY_CONFIG.type+'://'+PROXY_CONFIG.host+':'+PROXY_CONFIG.port,
}


async function createWindow () {
    // Create the browser window.

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'coinbet',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
           }
    })
    await mainWindow.loadFile(path.join(__dirname, '/src/index.html'))
    const session = mainWindow.webContents.session


        session.setProxy(PROXY_RULES).then(() => {
            mainWindow.loadURL('https://coin-bet.io/');
        }).catch((err) => {
            console.log(err)
            mainWindow.loadFile(path.join(__dirname,'/src/error.html'))
        });

        mainWindow.webContents.on("did-fail-load", function() {
            console.log(1)
            mainWindow.loadFile(path.join(__dirname,'/src/error.html'))
        });

    //mainWindow.loadURL('https://google.com/')
    // and load the index.html of the app.
    //mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Некоторые интерфейсы API могут использоваться только после возникновения этого события.
//app.commandLine.appendSwitch('remote-debugging-port', '3000')
//app.commandLine.appendSwitch('host-rules', 'MAP *.google.com proxy')


app.whenReady().then(() => {
    createWindow()
    //app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Можно также поместить их в отдельные файлы и применить к ним require.