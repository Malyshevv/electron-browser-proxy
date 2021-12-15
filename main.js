// main.js

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

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}


// Некоторые интерфейсы API могут использоваться только после возникновения этого события.
//app.commandLine.appendSwitch('remote-debugging-port', '3000')
//app.commandLine.appendSwitch('host-rules', 'MAP *.google.com proxy')

app.whenReady().then(() => {
    createWindow()
    //app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

