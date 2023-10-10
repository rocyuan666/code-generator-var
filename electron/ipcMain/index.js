const { ipcMain } = require('electron')
const { connectMysql, connectMysqlEnd, getTables, getFields } = require('../webapi/mysql')

function defineIpcMain() {
  ipcMain.handle('connectMysql', connectMysql)
  ipcMain.handle('connectMysqlEnd', connectMysqlEnd)
  ipcMain.handle('getTables', getTables)
  ipcMain.handle('getFields', getFields)
}

module.exports = {
  defineIpcMain,
}
