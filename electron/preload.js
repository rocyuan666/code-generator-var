const { contextBridge } = require('electron')

/**
 * 暴露给 window 的api
 * 访问：window.rpcApi.xxx
 * 使用 preload 需要开启 webPreferences.contextIsolation
 */
contextBridge.exposeInMainWorld('rocApi', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})
