const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { fileContentReplace } = require('./utils/index')

webpack(
  {
    mode: 'none',
    target: 'electron-main',
    entry: {
      main: path.join(__dirname, '../src/main.js'),
      preload: path.join(__dirname, '../src/preload.js'),
    },
    output: {
      path: path.join(__dirname, '../dist'),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, '../src/assets'),
            to: path.join(__dirname, '../dist/assets'),
          },
          {
            from: path.join(__dirname, '../src/ejsTemplate'),
            to: path.join(__dirname, '../dist/ejsTemplate'),
          },
          {
            from: path.join(__dirname, '../web'),
            to: path.join(__dirname, '../dist/views'),
          },
        ],
      }),
    ],
  },
  (error, stats) => {
    if (error) return console.log('打包错误', error)
    if (stats.hasErrors()) return console.log('打包错误', stats.toJson().errors)
    if (stats.hasWarnings()) console.log('打包警告', stats.toJson().warnings)
    fileContentReplace(path.join(__dirname, '../dist/main.js'), /(?:\.\.\/)/g, '').then(() => {
      console.log('打包成功~')
    })
  }
)
