const CompressPlugin = require('compression-webpack-plugin')

module.exports = {
  //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  runtimeCompiler: true,
	publicPath: process.env.NODE_ENV === 'production' ? 'public/' : '/',
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [new CompressPlugin({
					test: /\.js$|\.html$|\.css/,
					threshold: 10240,
					deleteOriginalAssets: false
				})]
			}
		}
	},
	// chainWebpack: config => {
	// 	config.mode = 'production'
	// 	config.optimization.splitChunks({
	// 		chunks: 'all',
	// 		cacheGroups: {
	// 			libs: {
	// 				name: 'chunk-libs',
	// 				test: /[\\/]node_modules[\\/]/,
	// 				priority: 10,
	// 				chunks: 'initial'
	// 			},
	// 			coreJs: {
	// 				name: 'chunk-corejs',
	// 				test: /[\\/]node_modules[\\/]_?core-js(.*)/,
	// 				priority: 20
	// 			},
	// 			swiper: {
	// 				name: 'chunk-swiper',
	// 				test: /[\\/]node_modules[\\/]_?swiper(.*)/,
	// 				priority: 20
	// 			},
	// 			bindingX: {
	// 				name: 'chunk-bindingX',
	// 				test: /[\\/]node_modules[\\/]_?weex-bindingx(.*)/,
	// 				priority: 20
	// 			}
	// 		}
	// 	})
	// },
  devServer: {
		hot: true, //自动保存
		// open: true, // 是否自动打开浏览器
		// https: true,  // 是否支持https
		port: 8080,
		// 跨域配置
		proxy: {
			'/analytics': { //此处并非一定和url一致。
				// target: 'https://test-fashion-wx-catalog.chanel.com.cn',
				// target: 'http://192.168.61.162:7001',
				target: 'http://127.0.0.1:9999',
				changeOrigin: true, //允许跨域
				ws: true,
				timeout: 10000,
				// pathRewrite: {
				// 	'^/api': '' // rewrite path
				// }
			}
		}
	},
}