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
    网页窗口.webContents.openDevTools()
    var 网页窗口内容 = 网页窗口.webContents

    var 控制窗口 = new BrowserWindow({
        height: 350,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, './控制窗口/preload.js'),
        },
    })
    控制窗口.loadFile('./控制窗口/index.html')
    // 控制窗口.webContents.openDevTools()

    var control_E = null
    ipcMain.on('control_E', function (event) {
        control_E = event
    })

    var 网页窗口状态 = 'loading'
    网页窗口内容.on('did-start-loading', function () {
        // console.log('loading')
        网页窗口状态 = 'loading'
    })
    网页窗口内容.on('did-stop-loading', function () {
        // console.log('finish')
        网页窗口状态 = 'finish'
        control_E.reply('update_url_async', 网页窗口.webContents.getURL())
    })

    ipcMain.on('control', (event, arg) => {
        网页窗口内容.executeJavaScript(`window.control(${JSON.stringify(arg)})`)
        event.returnValue = null
    })
    ipcMain.on('open_dev', (event, arg) => {
        网页窗口.webContents.openDevTools()
        event.returnValue = null
    })
    ipcMain.on('update_url', (event, arg) => {
        event.returnValue = 网页窗口.webContents.getURL()
    })

    var api = {
        waitLoading(delay = 500, time = 200, out = 10000) {
            return new Promise((res, rej) => {
                var n = 0
                var s = null
                var f = () => {
                    if (网页窗口状态 == 'finish') {
                        return res()
                    }
                    n++
                    if (n * time >= out) {
                        clearTimeout(s)
                        return rej('timeout')
                    }
                    s = setTimeout(f, time)
                }
                setTimeout(f, delay)
            })
        },
        sleep(time) {
            return new Promise((res, rej) => {
                setTimeout(function () {
                    res()
                }, time)
            })
        },
        async runJs(url) {
            var r = await 网页窗口内容.executeJavaScript(url, true)
            await api.waitLoading()
            return r
        },
        async getHtml(s) {
            return await api.runJs(`var a=document.querySelector('${s}').outerHTML;a`)
        },
        async click(s) {
            return await api.runJs(`var a=document.querySelector('${s}');a.click()`)
        },
        async alert(s) {
            return await api.runJs(`alert('${s}')`)
        },
    }

    ipcMain.on('run_code_loc', async (event, arg) => {
        delete require.cache[require.resolve(arg)]
        var f = require(arg)
        await f(api)
        event.returnValue = null
    })
}
