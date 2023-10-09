/**
 * electron-forge 打包配置
 *
 * @作者：rocyuan（袁鹏）
 * @邮箱：rocyuan666@163.com、roc@rocyuan.top
 * @微信：rocyuan666
 * @个人网站：https://rocyuan.top
 */

// const {
//   utils: { fromBuildIdentifier },
// } = require('@electron-forge/core')
const os = require('os')
const { execSync } = require('child_process')
const { icon, loadingGif, app } = require('./electron/config')

// 系统类型
const osType = os.type()
// make配置
let makers = [
  {
    name: '@electron-forge/maker-zip',
  },
]
if (osType == 'Windows_NT') {
  makers.push(
    {
      /**
       * 构建msi安装包，电脑需要安装 wixtool
       * /wixtool/wix311.exe
       */
      name: '@electron-forge/maker-wix',
      config: {
        icon: icon.win,
      },
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: icon.squirrel,
        loadingGif,
        setupIcon: icon.win,
      },
    }
  )
} else if (osType == 'Darwin') {
  makers.push({
    name: '@electron-forge/maker-dmg',
    config: {
      icon: icon.mac,
    },
  })
} else if (osType == 'Linux') {
  try {
    const stdout = execSync('lsb_release -a')
    if (stdout.indexOf('Ubuntu') != -1) {
      makers.push({
        /**
         * 构建deb安装包，电脑需要安装 fakeroot 和 dpkg
         * sudo apt install fakeroot dpkg
         */
        name: '@electron-forge/maker-deb',
        config: {
          options: {
            icon: icon.linux,
          },
        },
      })
    } else if (stdout.indexOf('Centos') != -1) {
      makers.push({
        /**
         * 构建rpm安装包，电脑需要安装 rpm 或 rpm-build
         * sudo yum install rpm-build
         * sudo apt install rpm
         * sudo dnf install rpm-build
         */
        name: '@electron-forge/maker-rpm',
        config: {
          icon: icon.linux,
        },
      })
    }
  } catch (error) {
    console.log('execSync错误', error)
  }
}

module.exports = {
  // buildIdentifier: 'production',
  packagerConfig: {
    // appBundleId: fromBuildIdentifier({ production: 'top.rocyuan.app' }),
    name: app.name,
    appVersion: app.version,
    appBundleId: app.bundleId,
    appCopyright: app.copyright,
    asar: true,
    icon: icon.iconNoExt,
  },
  rebuildConfig: {},
  makers,
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
}
