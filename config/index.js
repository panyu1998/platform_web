'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 设置访问代理
	// proxyTable: {
	// 	'/': {
	// 		target: 'http://140.200.0.133:8624',        // 连接库
	// 		//target: 'http://localhost:3834',        // 连接库
	// 		changeOrigin: true,                         // 跨域开关
	// 		pathRewrite: {                              // 统一匹配的接口，如用/api开头，使用'^/api'
	// 			'^/': '/'
	// 		}
	// 	},
	// 	'/c19': {
	// 		target: 'http://140.200.0.100:5684',        // 新冠接口
	// 		changeOrigin: true,                         // 跨域开关
	// 		pathRewrite: {                              // 统一匹配的接口，如用/api开头，使用'^/api'
	// 			'^/c19': '/'
	// 		}
	// 	},
	// },
	// 设置访问代理
	proxyTable: {
		'/c19': {
			target: 'http://140.200.0.100:5684',                // 流调表部分
			changeOrigin: true,                                 // 跨域开关
			pathRewrite: {                                         // 统一匹配的接口，如用/api开头，使用'^/api'
				'^/c19': '/'   // 实际请求去掉/limis以空字符串代替
			}
		},
		'/': {
			target: 'http://140.200.0.133:8624',                // 其他部分
			// target: 'http://140.200.0.100:5684',                // 其他部分
			changeOrigin: true,                                  // 跨域开关
			pathRewrite: {                                         // 统一匹配的接口，如用/api开头，使用'^/api'
					'^/': '/'
			}
		},
	},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
