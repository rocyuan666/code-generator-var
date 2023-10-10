/*
 * @作者：rocyuan（袁鹏）
 * @邮箱：roc@rocyuan.top、rocyuan666@163.comvite Commjs模块化
 * @微信：rocyuan666
 * @个人网站：http://rocyuan.top
 */
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  lintOnSave: true,
  assetsDir: 'assets',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    hot: true,
    port: 9876,
    // open: true,
    client: {
      overlay: true,
    },
    // 代理
    proxy: {
      '/api': {
        target: 'http://rocyuan.top:8080',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'VAR管理平台代码生成器'
      return args
    })
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        // 去掉全部 console.*
        args[0].terserOptions.compress.drop_console = true
        // 去掉指定 console.*
        // args[0].terserOptions.compress.pure_funcs = ["console.log"];
        return args
      })
      /*
        打包压缩图片（原始项目本身不启用也不安装，如需启用查看下方说明）
        注意：如需使用图片压缩请手动打开开关，并必须使用cnpm安装插件（因为插件依赖的图片优化器下载地址国内访问不到） `cnpm install -D image-webpack-loader`
      */
      const miniImg = false
      if (miniImg) {
        config.module
          .rule('images')
          .use('image-webpack-loader')
          .loader('image-webpack-loader')
          .options({
            bypassOnDebug: true,
          })
          .end()
      }
    }
  },
})
