const { app, BrowserWindow } = require('electron')
const windowState = require('electron-window-state')
const path = require('path')
const cfg = require('./config')
const { defineIpcMain } = require('./ipc')
const { isHttpOrHttps } = require('./utils/roc')
const { initEjsTemplate } = require('./utils')
const { createTray } = require('./main/tray')
const { nohup } = require('./main/nohup')

if (require('electron-squirrel-startup')) {
  app.quit()
}

function createWindow() {
  const mainWindowState = windowState({
    defaultWidth: 1300,
    defaultHeight: 900,
  })
  const win = new BrowserWindow({
    ...mainWindowState,
    title: `${cfg.app.name} - v${app.getVersion()}`,
    icon: cfg.appIcon,
    show: false,
    webPreferences: {
      backgroundThrottling: false, // 是否在页面成为背景时限制动画和计时器 默认值为 true
      nodeIntegration: false, // 是否启用集成Node. 默认值为 false
      contextIsolation: true, // 上下文隔离关闭  默认为 true
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (app.isPackaged) {
    isHttpOrHttps(cfg.prodLoad) ? win.loadURL(cfg.prodLoad) : win.loadFile(cfg.prodLoad)
  } else {
    win.webContents.openDevTools()
    isHttpOrHttps(cfg.devLoad) ? win.loadURL(cfg.devLoad) : win.loadFile(cfg.devLoad)
  }

  win.maximize()
  win.show()
  win.removeMenu()
  nohup(win)
  // 创建托盘
  createTray(win)
  // 定义ipcMain
  defineIpcMain()
  // 初始化ejs模板文件
  initEjsTemplate()

  mainWindowState.manage(win)
}

app.whenReady().then(() => {
  createWindow()
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
