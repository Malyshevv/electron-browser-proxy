// main.js

// Modules to control application life and create native browser window
//System modules
const { BrowserWindow, Menu, app } = require('electron')
const path = require('path')

// Require Config
const {PROXY_RULES} = require('./config/configProxy')
const {CONFIG_WINDOW} = require('./config/configWindow')
//My modules
//const { proxyList,getProxy } = require('./src/utils/proxy');
const { CustomMenu } = require('./src/components/Menu')



let mainWindow;

async function createWindow () {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        ...CONFIG_WINDOW,
        webPreferences: {
            preload: path.join(__dirname, './js/preload.js'),
            //nodeIntegration: true,
            //enableRemoteModule: true,
        }
    })

    //const menu = Menu.buildFromTemplate(CustomMenu())
    //Menu.setApplicationMenu(menu)


    //mainWindow.webContents.openDevTools()

    await mainWindow.loadFile(path.join(__dirname, '/src/loading.html'))
    const session = mainWindow.webContents.session
    //const getListProxy = getProxy();

        //if(proxyList.length > 0) {
    session.setProxy(PROXY_RULES).then(() => {
        mainWindow.loadURL('YOUR URL');
    }).catch((err) => {
        console.log(err)
        mainWindow.loadFile(path.join(__dirname,'/src/error.html'))
    });

    mainWindow.webContents.on("did-fail-load", function() {
        console.log(1)
        mainWindow.loadFile(path.join(__dirname,'/src/error.html'))
    });
        //}

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
