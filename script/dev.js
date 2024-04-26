const { exec } = require('child_process')
const path = require('path')

const workPath = path.join(__dirname, '../')

exec('npm run vue:dev', { cwd: workPath }, (err) => {
  if (err) return console.log('vue程序启动失败', err)
})

exec('npm run ele:dev', { cwd: workPath }, (err) => {
  if (err) return console.log('electron程序启动失败', err)
})

console.log('vue程序启动中...')
console.log('electron程序启动中...')
console.log('请稍等...')
