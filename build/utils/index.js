const fs = require('fs')

/**
 * 替换文件内容
 * @param {string} filePath
 * @param {string | RegExp} oldStr
 * @param {string} newStr
 */
function fileContentReplace(filePath, oldStr, newStr) {
  return new Promise((resolve, reject) => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const newFileContent = fileContent.replace(oldStr, newStr)
      fs.writeFileSync(filePath, newFileContent, 'utf8')
      resolve('替换成功')
    } catch (error) {
      console.log('替换出错：', error)
      reject(error)
    }
  })
}

module.exports = {
  fileContentReplace,
}
