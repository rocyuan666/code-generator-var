const { contextBridge, ipcRenderer } = require('electron')

/**
 * 暴露给 window 的api
 * 访问：window.rpcApi.xxx
 * 使用 preload 需要开启 webPreferences.contextIsolation
 */
contextBridge.exposeInMainWorld('electronApi', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 数据库相关
  connectMysql: (connData) => ipcRenderer.invoke('connectMysql', connData),
  connectMysqlEnd: () => ipcRenderer.invoke('connectMysqlEnd'),
  getTables: (databaseName) => ipcRenderer.invoke('getTables', databaseName),
  getFields: (databaseName, tableName) => ipcRenderer.invoke('getFields', databaseName, tableName),
  // 生成器相关
  getDirPath: () => ipcRenderer.invoke('getDirPath'),
  getPath: (name, addAppDir = false) => ipcRenderer.invoke('getPath', name, addAppDir),
})
