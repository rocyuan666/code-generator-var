const { exec, execSync } = require('child_process')
const path = require('path')

try {
  const workPath = path.join(__dirname, '../')
  execSync(`cd ${workPath}`)

  console.log('web程序启动中，启动时间可能较慢，请耐心等待...')
  exec('npm run web:dev', (err) => {
    if (err) return console.log('web程序启动失败', err)
  })

  console.log('electron程序启动中...')
  exec('npm run ele:start', (err) => {
    if (err) return console.log('electron程序启动失败', err)
  })
} catch (error) {
  console.log(error)
}
