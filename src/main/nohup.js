const { app, dialog } = require('electron')
/**
 * 创建托盘
 * @param {BrowserWindow} win
 */
function nohup(win) {
  // 当窗口要关闭时不退出应用
  win.on('close', (e) => {
    e.preventDefault()
    dialog
      .showMessageBox({
        type: 'warning',
        title: '系统提示',
        message: '是否需要退出程序？',
        buttons: ['后台运行', '退出程序'],
        defaultId: 0,
      })
      .then((result) => {
        if (result.response === 0) {
          win.hide()
        } else if (result.response === 1) {
          win.destroy()
          app.quit()
        }
      })
  })
}

module.exports = { nohup }
