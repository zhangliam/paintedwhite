const path = require('path')
const { name } = require('./package.json')
const { defineConfig } = require('@vue/cli-service')

/* 默认 */
// module.exports = defineConfig({
//   transpileDependencies: true,
// })


module.exports = defineConfig(() => {
  return {
    publicPath: './',
    transpileDependencies: true,
    lintOnSave: false,
    // devServer: {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   host: "0.0.0.0",
    //   port: process.env.PORT || 8080,
    //   open: false, //启动后是否自动打开浏览器
    //   hot: true,//热更新
    //   proxy: {
    //     [process.env.VUE_APP_BASE_API]: { //此处并非一定和url一致。
    //       target: process.env.VUE_APP_BASE_URL,
    //       changeOrigin: true, //允许跨域
    //       // ws: true,
    //       timeout: 5000,
    //       pathRewrite: {
    //         ['^' + process.env.VUE_APP_BASE_API]: '' // rewrite path
    //       },
    //       logLevel: 'debug'
    //     },
    //   },
    // },
    configureWebpack: {
      output: {
        library: `${name}-[name]`,
        libraryTarget: 'umd', // 把微应用打包成 umd 库格式
        chunkLoadingGlobal: `webpackJsonp_${name}`,
      },
    },
  }
})



