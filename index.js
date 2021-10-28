var { app, BrowserWindow, ipcMain } = require('electron')
var path = require('path')

app.whenReady().then(() => {
    入口()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) 入口()
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

function 入口() {
    var 网页窗口 = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, './网页窗口/preload.js'),
        },
    })
    网页窗口.loadURL('https://baidu.com')

    var 控制窗口 = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, './控制窗口/preload.js'),
        },
    })
    控制窗口.loadFile('./控制窗口/index.html')

    var 网页窗口状态 = 'loading'
    var 网页窗口内容 = 网页窗口.webContents
    网页窗口内容.on('did-finish-load', function () {
        console.log('finish')
        网页窗口状态 = 'finish'
    })
    网页窗口内容.on('did-start-loading', function () {
        console.log('loading')
        网页窗口状态 = 'loading'
    })

    ipcMain.on('control', (event, arg) => {
        网页窗口内容.executeJavaScript(`window.control(${JSON.stringify(arg)})`)
        event.returnValue = null
    })
    ipcMain.on('open_dev', (event, arg) => {
        网页窗口.webContents.openDevTools()
        event.returnValue = null
    })
    ipcMain.on('run_code', (event, arg) => {
        网页窗口内容.executeJavaScript('location.href="https://blog.51cto.com/u_5018054/3394104"')
        event.returnValue = null
    })
}
