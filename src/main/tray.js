const { app, Tray, Menu, BrowserWindow } = require('electron')
const cfg = require('../config')

/**
 * 创建托盘
 * @param {BrowserWindow} win
 */
function createTray(win) {
  const tray = new Tray(cfg.appIcon)
  tray.setToolTip(cfg.app.name)
  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `打开面板`,
      click: () => {
        win.show()
      },
    },
    {
      label: `退出程序`,
      click: () => {
        win.destroy()
        app.quit()
      },
    },
    {
      label: `v${cfg.app.version}`,
      enabled: false,
    },
  ])

  // 设置托盘菜单
  tray.setContextMenu(contextMenu)

  // 双击托盘显示窗口
  tray.on('double-click', () => {
    win.show()
  })
}

module.exports = {
  createTray,
}
