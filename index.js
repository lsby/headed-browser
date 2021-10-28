var { app, BrowserWindow } = require('electron')
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
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    网页窗口.loadURL('https://baidu.com')
    网页窗口.webContents.openDevTools()

    var 内容 = 网页窗口.webContents
    内容.on('did-finish-load', (_) => {
        内容.executeJavaScript('console.log(window.runjs(123))')
    })
}
