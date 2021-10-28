var { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('control', function (cmdobj) {
    console.log('control', cmdobj)

    var { cmd, data } = cmdobj

    if (cmd == 'reload') {
        location.href = location.href
    } else if (cmd == 'toUrl') {
        location.href = data
    } else if (cmd == 'back') {
        history.back()
    } else if (cmd == 'forward') {
        history.forward()
    }
})
