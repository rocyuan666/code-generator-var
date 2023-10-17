const { app, dialog } = require('electron')
const path = require('path')
const cfg = require('../config')

/**
 * 获取 应用程序目录
 * @param {String} name
 *
 * home 用户的 home 文件夹（主目录）
 * appData 每个用户的应用程序数据目录，默认情况下指向：
 *    %APPDATA% Windows 中
 *    $XDG_CONFIG_HOME or ~/.config Linux 中
 *    ~/Library/Application Support macOS 中
 * userData 储存你应用程序配置文件的文件夹，默认是 appData 文件夹附加应用的名称 按照习惯用户存储的数据文件应该写在此目录，同时不建议在这写大文件，因为某些环境会备份此目录到云端存储。
 * sessionData 此目录存储由 Session 生成的数据，例如 localStorage，cookies，磁盘缓存，下载的字典，网络 状态，开发者工具文件等。 默认为 userData 目录。 Chromium 可能在此处写入非常大的磁盘缓存，因此，如果您的应用不依赖于浏览器存储（如 localStorage 或 cookie）来保存用户数据，建议将此目录设置为其他位置，以避免污染 userData 目录。
 * temp 临时文件夹
 * exe当前的可执行文件
 * module The libchromiumcontent 库
 * desktop 当前用户的桌面文件夹
 * documents 用户文档目录的路径
 * downloads 用户下载目录的路径
 * music 用户音乐目录的路径
 * pictures 用户图片目录的路径
 * videos 用户视频目录的路径
 * recent 用户最近文件的目录 (仅限 Windows)。
 * logs应用程序的日志文件夹
 * crashDumps 崩溃转储文件存储的目录。
 */
function getPath(event, name, addAppDir = false) {
  if (addAppDir) {
    return path.resolve(app.getPath(name), cfg.app.name)
  } else {
    return app.getPath(name)
  }
}

/**
 * 选择目录路径
 */
function getDirPath() {
  return new Promise((reslove, reject) => {
    dialog
      .showOpenDialog({
        title: '请选择目录',
        properties: ['openDirectory'],
      })
      .then((result) => {
        if (result.canceled) {
          reject('取消选择')
        } else {
          reslove(result.filePaths)
        }
      })
      .catch((err) => {
        reject('失败' + err)
      })
  })
}

module.exports = {
  getPath,
  getDirPath,
}
