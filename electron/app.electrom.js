const { app, BrowserWindow, Tray } = require('electron')
// const windowState = require('electron-window-state')
const path = require('path')
const cfg = require('./config')
const { defineIpcMain } = require('./ipcMain')

function createWindow() {
  // const mainWindowState = windowState({
  //   defaultWidth: 1300,
  //   defaultHeight: 900,
  // })
  const win = new BrowserWindow({
    // ...mainWindowState,
    title: cfg.app.name,
    icon: cfg.appIcon,
    webPreferences: {
      backgroundThrottling: false, // 设置应用在后台正常运行
      // nodeIntegration: true, // 设置能在页面使用nodejs的API
      // contextIsolation: false, // 上下文隔离关闭
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.maximize()
  win.removeMenu()

  if (cfg.env == 'production') {
    win.loadFile(cfg.prodLoadFile)
  } else {
    win.loadURL(cfg.devLoadURL)
    win.webContents.openDevTools()
  }

  // mainWindowState.manage(win)
}

app.whenReady().then(() => {
  defineIpcMain()
  createWindow()

  const icon = cfg.appIcon
  const tray = new Tray(icon)
  tray.setToolTip(cfg.app.name)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
