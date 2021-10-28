var { contextBridge } = require('electron')
var { ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('init', function () {
    document.getElementById('刷新').onclick = function () {
        ipcRenderer.sendSync('control', { cmd: 'reload' })
    }
    document.getElementById('跳转').onclick = function () {
        ipcRenderer.sendSync('control', { cmd: 'toUrl', data: document.getElementById('url').value })
    }
    document.getElementById('后退').onclick = function () {
        ipcRenderer.sendSync('control', { cmd: 'back' })
    }
    document.getElementById('前进').onclick = function () {
        ipcRenderer.sendSync('control', { cmd: 'forward' })
    }
    document.getElementById('打开控制台').onclick = function () {
        ipcRenderer.sendSync('open_dev')
    }
    document.getElementById('刷新地址').onclick = function () {
        document.getElementById('url').value = ipcRenderer.sendSync('update_url')
    }
    document.getElementById('运行代码').onclick = function () {
        var x = document.getElementById('code')
        if (x.files.length == 0) {
            return alert('请选择代码')
        }
        ipcRenderer.sendSync('run_code_loc', x.files[0].path)
    }
    document.getElementById('刷新并运行代码').onclick = function () {
        var x = document.getElementById('code')
        if (x.files.length == 0) {
            return alert('请选择代码')
        }
        ipcRenderer.sendSync('control', { cmd: 'toUrl', data: document.getElementById('inputUrl').value })
        ipcRenderer.sendSync('run_code_loc', x.files[0].path)
    }

    ipcRenderer.send('control_E')
    ipcRenderer.on('update_url_async', function (event, arg) {
        document.getElementById('url').value = arg
    })
})
