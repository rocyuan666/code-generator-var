/**
 * electron-forge 打包配置
 *
 * @作者：rocyuan（袁鹏）
 * @邮箱：rocyuan666@163.com
 * @微信：rocyuan666
 */

// const {
//   utils: { fromBuildIdentifier },
// } = require('@electron-forge/core')
const os = require('os')
const { execSync } = require('child_process')
const { buildIcon, loadingGif, app } = require('./src/config')

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
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: buildIcon.squirrel,
        loadingGif,
        setupIcon: buildIcon.win,
      },
    },
    {
      /**
       * 构建msi安装包，电脑需要安装 wixtool 并配置环境变量
       * 如：C:\Program Files (x86)\WiX Toolset v3.11\bin
       * /wixtool/wix311.exe
       */
      name: '@electron-forge/maker-wix',
      config: {
        icon: buildIcon.win,
      },
    }
  )
} else if (osType == 'Darwin') {
  makers.push({
    name: '@electron-forge/maker-dmg',
    config: {
      icon: buildIcon.mac,
    },
  })
} else if (osType == 'Linux') {
  /**
   * 使用 lsb_release 判断系统类型，请先安装LSB
   * dabian系: sudo apt-get install lsb-release
   * RedHat系: sudo yum install redhat-lsb
   */
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
            icon: buildIcon.linux,
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
          icon: buildIcon.linux,
        },
      })
    }
  } catch (error) {
    console.log('execSync错误', error)
  }
}

module.exports = {
  // buildIdentifier 配合 fromBuildIdentifier 使用
  // buildIdentifier: 'production',
  // https://electron.github.io/packager/main/interfaces/Options.html
  packagerConfig: {
    // appBundleId: fromBuildIdentifier({ production: 'top.rocyuan.app' }),
    name: app.name,
    appVersion: app.version,
    appBundleId: app.bundleId,
    appCopyright: app.copyright,
    asar: true,
    // 应用程序的图标(makers中配置的图标是安装程序的图标)
    icon: buildIcon.iconNoExt,
    ignore: [
      'src',
      'web',
      'node_modules',
      'build',
      'wixtool',
      '.vscode',
      '.idea',
      '.git',
      'script',
      '.eslintignore',
      '.eslintrc.cjs',
      '.gitignore',
      '.npmrc',
      '.prettierrc.json',
      'forge.config.js',
      'jsconfig.json',
      'package-lock.json',
      'LICENSE',
      'README.md',
      'vue',
    ],
  },
  // https://github.com/electron/rebuild#how-can-i-integrate-this-into-grunt--gulp--whatever
  rebuildConfig: {},
  makers,
  plugins: [],
}
